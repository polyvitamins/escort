"use strict";
var tap = require('tap');
var Escort = require('./../dist/escort-es5.js');
tap.test('Test degrade at double call',function (t) {
	t.plan(2);
	var outside = {
		initialized: false
	};
	var processor = Escort.factory(function() {
		t.ok(!outside.initialized, 'Outside must be uninitialized');
		outside.initialized = true;
		return function() {
			outside.initialized = false;
		}
	}, Escort.SINGULAR);

	processor();
	processor();
});

tap.test('Test degrade by destructor',function (t) {
    t.plan(2);
    var outside = {
        initialized: false
    };
    var processor = Escort.factory(function(increment) {
        t.ok(!outside.initialized, 'Outside must be uninitialized');
        outside.initialized = true;
        increment.backtrack(function() {
            outside.initialized = false;
        });
    }, Escort.SINGULAR);

    processor();
    processor();
});

