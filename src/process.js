/***
Trait Deploy - mixin for performs pasobility to use construct() method

Method construct() accepts anonym function as first argument. This function converts to string and stored to the object.
Recall the same piece of code will invoke the degrade() method of construct process.

```
var deployTarget,
exclusive = Progress.equip(function(progress) {
	deployTarget = new Complex();
	return function() {
		deployTarget.destructor();
	}
});


exclusive();
// Complex constructed

exclusive();
// Complex destructed
// Complex constructed
```

NEED TO PERFORM BITMASK FOR OPTIONS
Process.create(fn, Process.TRAIT_SINGULAR);
Process.run(fn, Process.TRAIT_SINGULAR | Process.TRAIT_BREAKABLE | Process.TRAIT_PROMISED);

Vobject.createProcess(fn, Process.TRAIT_PROMISED);
Vobject.runProcess(fn, Process.TRAIT_BREAKABLE | Process.TRAIT_PROMISED);
***/

"use strict";

var Creed = require('polypromise').factory({
	immediate: true,
	manual: true
});


/***
Progress
***/
var $processesKey = Symbol('processes');
module.exports = class Process {
	createProcess(executable, bitoptions, parentProcess) {
		return Process.create(executable, bitoptions, this, parentProcess);
	}

    runProcess(executable) {
		return Process.run(executable, bitoptions, this, parentProcess);
	}

	/**
	* Create new function assigned to process
	*
	* @param {function} executable Any function
	* @param {number} bitopt Options in bit mask format
	* @param {object} bindTo Bind process to object (creates special hidden property that contains process keys). Use it only with option PROC_SINGULAR
	* @param {object} parentProcess Set process as child process of {parentProcess}
	**/
	static create(executable, bitopt, bindTo, parentProcess) {
		
		if (bitopt & Process.PROC_SINGULAR) {
			if ("object"===typeof bindTo) {
				var stamp = executable.toString();
				if (!bindTo.hasOwnProperty($processesKey)) Object.defineProperty(bindTo, $processesKey, {
					enumerable: false,
					value: {}
				});
				if ("object"!==typeof Process[$processesKey][stamp])
	            Process[$processesKey][stamp] = new Processor(executable, bitopt, bindTo, parentProcess);
	        	return Process[$processesKey][stamp]->progressor;
	        } else {
	        	return new Processor(executable, bitopt, Process, parentProcess).progressor;
	        }
			
		} else {
			return function() {
				return new Processor(executable, bitopt, "object"===typeof bindTo?bindTo:Process, parentProcess).progressor.apply(Process, Array.prototype.slice.apply(arguments));
			}
		}
	}

	static run(executable, bitopt, bindTo, parentProcess) {
		return (Process.create(executable, bitopt, bindTo, parentProcess))();
	}
}

Process.PROC_SINGULAR = bit.creare(1); // Repeated execution calls rollback of last progress
Process.PROC_PROMISE = bit.creare(2); // Process become promise
Process.PROC_WAITTICK = bit.creare(3); // Process waits next tick before execution


function Processor(handler, bitoptions, context, parent) {
	this.destructors = []; // List of functions destructors (see .destructor method)
	this.closers = []; // List of functions closers (see .closer method)
	this.context = context||this; // Current context
	this.bitoptions = bitoptions; // Options in bitmask format

	var processor = this;
	this.progressor = function process() {
		if (bitoptions & PROC_PROMISE) this.clearPromise();
		if (processor.backups.length>0) { // 
			processor.degrade();
		}
		var result,
		executor = function() {
			try {
				result = handler.apply(processor.context, ([processor]).concat(Array.prototype.slice.call(arguments)));
	            if ("function"===typeof result) processor.destructor(result);
			} catch(e) {
				/* Rollback process */
				processor.abort(e);
			}
		}
		if (bitoptions & PROC_WAITTICK) {
			setTimeout(executor);
		} else {
			executor();
		}
		
		if (bitoptions & PROC_PROMISE) return processor;
		else return function() {
			processor.degrade();
		}
	}
    this.progressor.processor = this;
    this.progressor.run = function() {
        return this.run();
    };
}

Processor.prototype = {
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
	/**
	* Adds reverse function
	*
	* @param {function} handler
	**/
    destructor: function(handler) {
		this.destructors.push(handler);
	},
	/**
	* Adds closer handler (function that will be called at end)
	**/
	closer: function(handler) {
		this.closers.push(handler);
	},
	/**
	* Proceed async. In handler you can use process object as sush as in main process.
	* 
	**/
    async: function(handler) {
		var processor = this,
		actual = true;
		this.closer(() => actual = false);
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
	Rollback all progress changes
	*/
	degrade: function(reason) {
		for (var prop in this.destructors) {
			if (this.destructors.hasOwnProperty(prop) && "function"===typeof this.des[prop]) this.destructors[prop]();
		}
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
		if (this.bitoptions & Process.PROC_PROMISE)
		this.$reject(reason instanceof Error ? reason : new Error(reason));
	},
	/*
	Calling when process successful complete and do not need to do anything in this process (prevent all async functions and subprocesses)
	*/
	success: function(data) {
		this.stop();
		// Send resolve if we are promise
		if (this.bitoptions & Process.PROC_PROMISE)
		this.$resolve(data); 
	},
	stop: function() {
		this.closers.forEach(function(closer) {
			closer();
		});
		this.closers = [];
	},
	clear: function() {
		// Clear backup
		this.destructors = [];
	}
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

