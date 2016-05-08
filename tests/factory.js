"use strict";
var tap = require('tap');
var Tracker = require('./../dist/progressive.js');

tap.test('Test factory', function(t) {
    t.plan(2);
    var outside = {
        initialized: false
    };
    Tracker.increment(function(increment) {
        t.ok(!outside.initialized, 'Outside must be uninitialized');
        outside.initialized = true;
        increment.backtrack(function() {
            outside.initialized = false;
        });
    }, Tracker.SINGULAR);

    Tracker.increment(function(increment) {
        t.ok(!outside.initialized, 'Outside must be uninitialized');
        outside.initialized = true;
        increment.backtrack(function() {
            outside.initialized = false;
        });
    }, Tracker.SINGULAR);
});