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


***/

"use strict";

var Creed = require('polypromise').factory({
	config: {
		immediate: true
	}
});

function Processor(handler, context) {
	this.stamp = handler.toString();
	this.backups = [];
	this.context = context||this;

	var processor = this;
	this.progressor = function process() {
		if (processor.backups.length>0) { // 
			processor.degrade();
		}
		try {
			var result = handler.apply(processor.context, ([processor]).concat(Array.prototype.slice.call(arguments)));
            if ("function"===typeof result) processor.destructor(result);
		} catch(e) {
			/* Rollback process */
			processor.abort(e);
		}
	}
    this.progressor.processor = this;
    this.progressor.run = function() {
        return this.run();
    };
}

Processor.prototype = {
	/**
	Performs backup function item to rollback queue
	**/
    destructor: function(handler) {
		this.backups.push(handler);
	},
    proceed: function(handler) {
		var processor = this,
		actual = true;
		this.distructor(() => actual = false);
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
		for (var prop in this.backups) {
			if (this.backups.hasOwnProperty(prop) && "function"===typeof this.backups[prop]) this.backups[prop]();
		}
		// Clear backup
		this.backups = [];
	},
	/*
	Calling when process crashed
	Invokes $reject
	*/
	abort: function(reason) {
		this.degrade();
		this.$reject(reason instanceof Error ? reason : new Error(reason));
	},
    /*
    Executes progressor
    */
    run: function() {
       this.progressor();

        return this;
    }

}

/***
Progress
***/
var $processesKey = Symbol('processes');
module.exports = class Process {
	createProcess(executable) {
		return new Processor(executable, this).progressor;
	}

    runProcess(executable) {
		var stamp = executable.toString();
		if (!this.hasOwnProperty($processesKey)) Object.defineProperty(this, $processesKey, {
			enumerable: false,
			value: {}
		});
        if ("object"!==typeof this[$processesKey][stamp])
        this[$processesKey][stamp] = ProcessorFactory(handler, Progress);
        return this[$processesKey][stamp].run();
	}

	static create(executable) {
		return new Processor(executable).progressor;
	}

	static run(executable) {
		var stamp = executable.toString();
		if (!Process.hasOwnProperty($processesKey)) Object.defineProperty(Process, $processesKey, {
			enumerable: false,
			value: {}
		});
		if ("object"!==typeof Process[$processesKey][stamp])
            Process[$processesKey][stamp] = new Processor(executable, Process);
        return Process[$processesKey][stamp].run();
	}
}



