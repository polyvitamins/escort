"use strict";
var tap = require('tap');
var Escort = require('./../dist/progressive.js');
tap.test('Test degrade at double call',function (t) {
    t.plan(2);
    var outside = {
        a: 1,
        b: 2,
        c: undefined
    };
    var processor = Escort.factory(function(increment) {
        increment.track(function() {
            outside.a = 2;
            outside.b = 3;

            return function() {
                outside.a = 1;
                outside.b = 2;
            }
        });

        setTimeout(increment.async(function() {

            outside.c = 'a';
            t.ok(outside.a==2&&outside.b==3&&outside.c=='a', 'State must be changed by prevoius track');

            increment.backtrack(function() {
                outside.c = undefined;
            });

            setTimeout(function() {
                t.ok(outside.a==1&&outside.b==2&&outside.c==undefined, 'State must be changed by prevoius track');
                t.end();
            });

            increment.degrade();
        }),100);
    }, Escort.SINGULAR | Escort.PROMISE);

    processor()
    .catch(function(e) {
        t.ok(true, 'Promise rejection must be cacthed');
    });
});
