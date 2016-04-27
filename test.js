"use strict";
var tap = require('tap');
var Process = require('./src/process.js');
tap.test('Test degrade at double call',function (t) {
	t.plan(2);
	var outside = {
		initialized: false
	};
	var processor = Process.create(function() {
		t.ok(!outside.initialized, 'Outside must be uninitialized');
		outside.initialized = true;
		return function() {
			outside.initialized = false;
		}
	});

	processor();
	processor();
});

tap.test('Test degrade by destructor',function (t) {
    t.plan(2);
    var outside = {
        initialized: false
    };
    var processor = Process.create(function(process) {
        t.ok(!outside.initialized, 'Outside must be uninitialized');
        outside.initialized = true;
        process.destructor(function() {
            outside.initialized = false;
        });
    });

    processor();
    processor();
});

tap.test('Test processing', function(t) {
    t.plan(2);
    var outside = {
        initialized: false
    };
    Process.run(function(process) {
        t.ok(!outside.initialized, 'Outside must be uninitialized');
        outside.initialized = true;
        process.destructor(function() {
            outside.initialized = false;
        });
    });

    Process.run(function(process) {
        t.ok(!outside.initialized, 'Outside must be uninitialized');
        outside.initialized = true;
        process.destructor(function() {
            outside.initialized = false;
        });
    });
});

class investigator extends Process {

}
var tester = new investigator();
tap.test('Test process mixin createProcess', function(t) {
    t.plan(2);
    var outside = {
        initialized: false
    };
    var processor = tester.createProcess(function(process) {
        t.ok(!outside.initialized, 'Outside must be uninitialized');
        outside.initialized = true;
        process.destructor(function() {
            outside.initialized = false;
        });
    });

    processor();
    processor();
});

tap.test('Test process mixin processing', function(t) {
    t.plan(2);
    var outside = {
        initialized: false
    };
    tester.runProcess(function(process) {
        t.ok(!outside.initialized, 'Outside must be uninitialized');
        outside.initialized = true;
        process.destructor(function() {
            outside.initialized = false;
        });
    });

    tester.runProcess(function(process) {
        t.ok(!outside.initialized, 'Outside must be uninitialized');
        outside.initialized = true;
        process.destructor(function() {
            outside.initialized = false;
        });
    });

});


tap.test('Promise mode resolve', function(t) {
	t.plan(1);
	tester.runProcess(function(process) {
		setTimeout(process.async(function() {
			process.resolve('done');
		}, 100);
	})
	.then(function(res) {
		console.log('Result ', res);
		t.ok(res=='done', 'Resolve result must be `done`');
	})
	.catch(function(e) {
		throw e;
	});
});

tap.test('Promise mode reject', function(t) {
	t.plan(1);
	tester.runProcess(function(process) {
		setTimeout(process.async(function() {
			process.reject('not done');
		}, 100);
	})
	.then(function(res) {
		console.log('Result ', res);
		t.ok(res=='done', 'Resolve result must be `done`');
	})
	.catch(function(e) {
		throw e;
	});
});