/***
Trait Deploy - mixin for performs pasobility to use construct() method

Method construct() accepts anonym function as first argument. This function converts to string and stored to the object.
Recall the same piece of code will invoke the degrade() method of construct process.

```
var deployTarget,
exclusive = Escort.equip(function(progress) {
	deployTarget = new Complex();
	return function() {
		deployTarget.backtrack();
	}
});


exclusive();
// Complex constructed

exclusive();
// Complex destructed
// Complex constructed
```

NEED TO PERFORM BITMASK FOR OPTIONS
Escort.create(fn, Escort.TRAIT_SINGULAR);
Escort.run(fn, Escort.TRAIT_SINGULAR | Escort.TRAIT_BREAKABLE | Escort.TRAIT_PROMISED);

Vobject.createProcess(fn, Escort.TRAIT_PROMISED);
Vobject.runProcess(fn, Escort.TRAIT_BREAKABLE | Escort.TRAIT_PROMISED);
***/

"use strict";
var bit = require('bitmask');
var Creed = require('polypromise').factory({
	immediate: true,
	manual: true
});
var inherit = require('inherit');
var Suit;

Creed.test = 11;
/***
Escort
***/
var $processesKey = Symbol('processes'),
$objectSingularDestructors = Symbol();
var Escort = class Escort {
	createSuitation(executable, bitoptions, parentProcess) {
		return Escort.create(executable, bitoptions, this, parentProcess);
	}

	createSingularSuitation(executable, bitoptions, parentProcess) {
		return Escort.create(executable, (bitoptions || 0) | Escort.SINGULAR, this, parentProcess);
	}

    increment(executable) {
		return Escort.run(executable, bitoptions, this, parentProcess);
	}

	singularSuit(executable) {
		return Escort.run(executable, (bitoptions || 0) | Escort.SINGULAR, this, parentProcess);
	}

	/**
	* Create new function assigned to process
	*
	* @param {function} executable Any function
	* @param {number} bitopt Options in bit mask format
	* @param {object} bindTo Bind process to object (creates special hidden property that contains process keys). Use it only with option SINGULAR
	* @param {object} parentProcess Set process as child process of {parentProcess}
	**/
	static factory(executable, bitopt, bindTo, parentProcess) {
		this.$id = Symbol();
		if (bitopt & Escort.SINGULAR) {
            let medium =  "object"===typeof bindTo ? bindTo : Escort;

				var stamp = executable.toString();
				if (!medium.hasOwnProperty($processesKey)) Object.defineProperty(medium, $processesKey, {
					enumerable: false,
					value: {}
				});
				if ("object"!==typeof medium[$processesKey][stamp])
                    medium[$processesKey][stamp] = new Suit(executable, bitopt, medium, parentProcess);
	        	return medium[$processesKey][stamp].compiledHandler;

			
		} else {
			return function() {
				return new Suit(executable, bitopt, "object"===typeof bindTo?bindTo:Escort, parentProcess).compiledHandler.apply(Escort, Array.prototype.slice.apply(arguments));
			}
		}
	}

	/*
	Creates new 
	*/
	static track(executable, bitopt, bindTo, parentProcess) {
		return (Escort.factory(executable, bitopt, bindTo, parentProcess))();
	}
}

Escort.SINGULAR = bit.create(1); // Repeated execution calls rollback of last progress
Escort.PROMISE = bit.create(2); // Process become promise
Escort.WAITTICK = bit.create(3); // Process waits next tick before execution
Escort.DESCTRUCTOR = Symbol('DESCTRUCTOR');
var $actual = Symbol('actual');

Suit = function(handler, bitoptions, context, parent) {
	this.bitoptions = bitoptions || 0;
	this.destructors = []; // List of functions destructors (see .destructor method)
	this.closers = []; // List of functions closers (see .closer method)
	this.context = context||this; // Current context
	this.bitoptions = bitoptions; // Options in bitmask format
    this[$actual] = false;
	

	if ("function"===typeof handler) {
		/* Assumes that the function immediately available */
		this.compiledHandler = this.compileHandler(handler);
		this.compiledHandler.destroy = function() {
			this.stop();
			this.degrade();
		}.bind(this);
		this.compiledHandler.suit = this;
	} else {
		/* It assumes that the function will be specified later */
		this.compiledHandler = function slot(handler, args) {
			this.compileHandler(handler).apply(this, args);
			if (this.bitoptions & Escort.PROMISE) return this;
			else return function() {
				this.degrade();
			}
		}.bind(this);
	}
}

Suit.prototype = {
	compileHandler: function(handler) {
		var self = this;
		return function process() {
			var args = Array.prototype.slice.call(arguments);
			self[$actual] = true;
			if (self.bitoptions & Escort.PROMISE) self.clearPromise();
			if (self.destructors.length>0) { // 
				self.degrade();
			}
			var result,
			executor = function() {
				try {
					result = handler.apply(self.context, ([self]).concat(args));
			        if ("function"===typeof result) self.backtrack(result);
				} catch(e) {
					/* Rollback process */
					self.abort(e);
				}
			}
			if (self.bitoptions & Escort.WAITTICK) {
				setTimeout(executor);
			} else {
				executor();
			}

			if (self.bitoptions & Escort.PROMISE) return self;
			else return function() {
				self.degrade();
			}
		}
	},
	/**
	* Returns destroyer.
	* 
	* For example:
	* var destroyer = this.runProcess(()=>{})
	* .then(()=>{})
	* .catch(()=>{})
	* .destroyer;
	*
	**/
	get destroyer() {
		return function() {
			this.degrade();
		}.bind(this);
	},
    track: function(handler) {
        if (this[$actual]) {
            var result = handler.apply(this);
            if ("function"===typeof result)
            this.backtrack(result);
        }
    },
	/**
	* Adds reverse function
	*
	* @param {function} handler
	**/
    backtrack: function(handler) {
        if (this[$actual])
		this.destructors.push(handler);
	},
	/**
	* Adds closer handler (function that will be called at end)
	**/
	finally: function(handler) {
		this.closers.push(handler);
	},
	/**
	* Proceed async. In handler you can use process object as sush as in main process.
	* 
	**/
    async: function(handler) {
		var processor = this,
		actual = true;
		this.finally(() => actual = false);
		return function process() {
			if (!actual) return false; // Ignore function if non actual
            try {
				handler.apply(processor.context, ([processor]).concat(Array.prototype.slice.call(arguments)));
			} catch(e) {
				/* Rollback process */
				processor.abort(e);
			}
		}
	},
	/*
	Follow another progress (or native promise)
	This merhod returns promise-like object

	increment.follow(new Promise((resolve, reject) => {
	
	}))
	.then(() => {})
	*/
	follow: function(promiseLike) {
		/* Discard promise if it is not actual */
		if (!this[$actual]) {
			if ("function"===typeof promiseLike.abort) promiseLike.abort();
		} else {
			promiseLike
			.then((...args) => {

			}).
			catch((...args) => {
				this.abort(...args);
			});
		}

		/* Listen for reject and make fake promise for output */
		
		return {
			then: (handler) => {
				if (this[$actual]) 
				promiseLike.then(handler);
				return promiseLike;
			},
			catch: (handler) => {
				if (this[$actual]) 
				promiseLike.catch(handler);
				return promiseLike;
			},
			complete: (handler) => {
				if (this[$actual]) {
					if ("function"===typeof promiseLike.complete) {
						promiseLike.complete(handler);
					} else if ("function"===typeof promiseLike.always) {
						promiseLike.always(this.async(handler));
					} else {
						var awaits = true;
						promiseLike.then((...args) => {
							if (awaits) handler(...args);
							awaits = false;
						});
						promiseLike.catch((...args) => {
							if (awaits) handler(...args);
							awaits = false;
						});
					}
				}
				return promiseLike;
			}
		}
	},
	/*
	Rollback all progress changes
	*/
	degrade: function(reason) {
		this.destructors.reverse().forEach(function(destructor) {
			if ("function"===typeof destructor) destructor();
		});
		
		this.clear();
	},
	/*
	Calling when process crashed
	Invokes $reject
	*/
	abort: function(reason) {
		console.warn('Escort aborted: ', reason);
		this.stop();
		this.degrade();

		// Send reject if we are promise
		if (this.bitoptions & Escort.PROMISE)
		this.$reject(reason instanceof Error ? reason : new Error(reason));
	},
	/*
	Calling when process successful complete and do not need to do anything in this process (prevent all async functions and subprocesses)
	*/
	success: function(data) {
		this.stop();
		// Send resolve if we are promise
		if (this.bitoptions & Escort.PROMISE)
		this.$resolve(data); 
	},
	stop: function() {
        this[$actual] = false;
		this.closers.forEach(function(closer) {
			closer();
		});
		this.closers = [];
	},
	clear: function() {
		// Clear backup
		this.destructors = [];
	},
    /*
    Executes compiled handler
    */
    run: function() {
       this.compiledHandler();

        return this;
    },
    /*
	* Sends resolve data (process will not stop)
    */
    resolve: function() {
    	this.$resolve.apply(this, Array.prototype.slice.apply(arguments));
    },
    /*
	* Send reject data (process will not stop)
    */
    reject: function() {
    	this.$reject.apply(this, Array.prototype.slice.apply(arguments));
    },
    /**
	* Clear all Promise queues (resolve, reject, always)
    **/
    clearPromise: function() {
    	this.$clearQueues();
    }

}

Suit = inherit(Suit, Creed);

function createSingularMethods() {
	let Component, methods;
	if ("function"===typeof arguments[0]) {
		Component = arguments[0];
		methods = "object"===typeof arguments[1] ? arguments[1] : {};
	} else {
		Component = class {};
		methods = "object"===typeof arguments[0] ? arguments[0] : {};
	}
	
	return class HighOrderSingulars extends Component {
		constructor() {
			super();
			// List of destructors
			Object.defineProperty(this, $objectSingularDestructors, {
				writable: false,
				editable: false,
				enumerable: false,
				value: []
			});

			Object.defineProperty(this, Escort.DESCTRUCTOR, {
				writable: false,
				editable: false,
				enumerable: false,
				value: () => {
					for (let destroyer of this[$objectSingularDestructors]) {
						destroyer();
					}
				}
			});

			for (let methodName in methods) {
				if (methods.hasOwnProperty(methodName)) {

					this[methodName] = Escort.factory(methods[methodName], Escort.SINGULAR, HighOrderSingulars);
					this[$objectSingularDestructors].push(() => {
						this[methodName].destroy();
					});
				}
			}
		}
	}
	
}

Escort.createSingularMethods = createSingularMethods;

export default Escort;

