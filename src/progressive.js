/***
Trait Deploy - mixin for performs pasobility to use construct() method

Method construct() accepts anonym function as first argument. This function converts to string and stored to the object.
Recall the same piece of code will invoke the degrade() method of construct process.

```
var deployTarget,
exclusive = Tracker.equip(function(progress) {
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
Tracker.create(fn, Tracker.TRAIT_SINGULAR);
Tracker.run(fn, Tracker.TRAIT_SINGULAR | Tracker.TRAIT_BREAKABLE | Tracker.TRAIT_PROMISED);

Vobject.createProcess(fn, Tracker.TRAIT_PROMISED);
Vobject.runProcess(fn, Tracker.TRAIT_BREAKABLE | Tracker.TRAIT_PROMISED);
***/

"use strict";
var bit = require('bitmask');
var Creed = require('polypromise').factory({
	immediate: true,
	manual: true
});
var inherit = require('inherit');
var Increment;

Creed.test = 11;
/***
Tracker
***/
var $processesKey = Symbol('processes');
var Tracker = class Tracker {
	createIncrementation(executable, bitoptions, parentProcess) {
		return Tracker.create(executable, bitoptions, this, parentProcess);
	}

	createSingularIncrementation(executable, bitoptions, parentProcess) {
		return Tracker.create(executable, (bitoptions || 0) | Tracker.SINGULAR, this, parentProcess);
	}

    increment(executable) {
		return Tracker.run(executable, bitoptions, this, parentProcess);
	}

	singularIncrement(executable) {
		return Tracker.run(executable, (bitoptions || 0) | Tracker.SINGULAR, this, parentProcess);
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
		
		if (bitopt & Tracker.SINGULAR) {
            let medium =  "object"===typeof bindTo ? bindTo : Tracker;

				var stamp = executable.toString();
				if (!medium.hasOwnProperty($processesKey)) Object.defineProperty(medium, $processesKey, {
					enumerable: false,
					value: {}
				});
				if ("object"!==typeof medium[$processesKey][stamp])
                    medium[$processesKey][stamp] = new Increment(executable, bitopt, medium, parentProcess);
	        	return medium[$processesKey][stamp].progressor;

			
		} else {
			return function() {
				return new Increment(executable, bitopt, "object"===typeof bindTo?bindTo:Tracker, parentProcess).progressor.apply(Tracker, Array.prototype.slice.apply(arguments));
			}
		}
	}

	static increment(executable, bitopt, bindTo, parentProcess) {
		return (Tracker.factory(executable, bitopt, bindTo, parentProcess))();
	}
}

Tracker.SINGULAR = bit.create(1); // Repeated execution calls rollback of last progress
Tracker.PROMISE = bit.create(2); // Process become promise
Tracker.WAITTICK = bit.create(3); // Process waits next tick before execution
var $actual = Symbol('actual');

Increment = function(handler, bitoptions, context, parent) {
	this.destructors = []; // List of functions destructors (see .destructor method)
	this.closers = []; // List of functions closers (see .closer method)
	this.context = context||this; // Current context
	this.bitoptions = bitoptions; // Options in bitmask format
    this[$actual] = false;

	var processor = this;
	this.progressor = function process() {
        processor[$actual] = true;
		if (bitoptions & Tracker.PROMISE) processor.clearPromise();
		if (processor.destructors.length>0) { // 
			processor.degrade();
		}
		var result,
		executor = function() {
			try {
				result = handler.apply(processor.context, ([processor]).concat(Array.prototype.slice.call(arguments)));
	            if ("function"===typeof result) processor.backtrack(result);
			} catch(e) {
				/* Rollback process */
				processor.abort(e);
			}
		}
		if (bitoptions & Tracker.WAITTICK) {
			setTimeout(executor);
		} else {
			executor();
		}
		
		if (bitoptions & Tracker.PROMISE) return processor;
		else return function() {
			processor.degrade();
		}
	}
    this.progressor.processor = this;
    this.progressor.run = function() {
        return this.run();
    };
}

Increment.prototype = {
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
			return;
		}

		/* Listen for reject and make fake promise for output */
		promiseLike
		.then((...args) => {

		}).
		catch((...args) => {
			this.abort(...args);
		});
		return {
			then: (handler) => {
				promiseLike.then(this.async(handler));
			},
			catch: (handler) => {
				promiseLike.catch(this.async(handler));
			},
			complete: (handler) => {
				if ("function"===typeof promiseLike.complete) {
					promiseLike.complete(this.async(handler));
				} else {
					var awaits = true;
					promiseLike.then((...args) => {
						if (awaits) this.async(handler)(...args);
						awaits = false;
					});
					promiseLike.catch((...args) => {
						if (awaits) this.async(handler)(...args);
						awaits = false;
					});
				}
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
		this.stop();
		this.degrade();

		// Send reject if we are promise
		if (this.bitoptions & Tracker.PROMISE)
		this.$reject(reason instanceof Error ? reason : new Error(reason));
	},
	/*
	Calling when process successful complete and do not need to do anything in this process (prevent all async functions and subprocesses)
	*/
	success: function(data) {
		this.stop();
		// Send resolve if we are promise
		if (this.bitoptions & Tracker.PROMISE)
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
    Executes progressor
    */
    run: function() {
       this.progressor();

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

Increment = inherit(Increment, Creed);


module.exports = Tracker;
