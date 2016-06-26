"use strict";
var tap = require('tap');
var Escort = require('./../dist/escort-es5.js');

tap.test('Test factory', function(t) {
    t.plan(2);
    var outside = {
        initialized: false
    };
    Escort.track(function(increment) {
        t.ok(!outside.initialized, 'Outside must be uninitialized');
        outside.initialized = true;
        increment.backtrack(function() {
            outside.initialized = false;
        });
    }, Escort.SINGULAR);

    Escort.track(function(increment) {
        t.ok(!outside.initialized, 'Outside must be uninitialized');
        outside.initialized = true;
        increment.backtrack(function() {
            outside.initialized = false;
        });
    }, Escort.SINGULAR);
});