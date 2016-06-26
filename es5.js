/*!
 * Copyright (c) 2016-present, Vladimir Kalmykov (@morulus) vladimirmorulus@gmail.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

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

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var bit = __webpack_require__(1);
	var Creed = __webpack_require__(2).factory({
		immediate: true,
		manual: true
	});
	var inherit = __webpack_require__(9);
	var Suit;

	Creed.test = 11;
	/***
	Escort
	***/
	var $processesKey = Symbol('processes'),
	    $objectSingularDestructors = Symbol();
	var Escort = function () {
		function Escort() {
			_classCallCheck(this, Escort);
		}

		_createClass(Escort, [{
			key: 'createSuitation',
			value: function createSuitation(executable, bitoptions, parentProcess) {
				return Escort.create(executable, bitoptions, this, parentProcess);
			}
		}, {
			key: 'createSingularSuitation',
			value: function createSingularSuitation(executable, bitoptions, parentProcess) {
				return Escort.create(executable, (bitoptions || 0) | Escort.SINGULAR, this, parentProcess);
			}
		}, {
			key: 'increment',
			value: function increment(executable) {
				return Escort.run(executable, bitoptions, this, parentProcess);
			}
		}, {
			key: 'singularSuit',
			value: function singularSuit(executable) {
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

		}], [{
			key: 'factory',
			value: function factory(executable, bitopt, bindTo, parentProcess) {
				this.$id = Symbol();
				if (bitopt & Escort.SINGULAR) {
					var medium = "object" === (typeof bindTo === 'undefined' ? 'undefined' : _typeof(bindTo)) ? bindTo : Escort;

					var stamp = executable.toString();
					if (!medium.hasOwnProperty($processesKey)) Object.defineProperty(medium, $processesKey, {
						enumerable: false,
						value: {}
					});
					if ("object" !== _typeof(medium[$processesKey][stamp])) medium[$processesKey][stamp] = new Suit(executable, bitopt, medium, parentProcess);
					return medium[$processesKey][stamp].compiledHandler;
				} else {
					return function () {
						return new Suit(executable, bitopt, "object" === (typeof bindTo === 'undefined' ? 'undefined' : _typeof(bindTo)) ? bindTo : Escort, parentProcess).compiledHandler.apply(Escort, Array.prototype.slice.apply(arguments));
					};
				}
			}

			/*
	  Creates new 
	  */

		}, {
			key: 'track',
			value: function track(executable, bitopt, bindTo, parentProcess) {
				return Escort.factory(executable, bitopt, bindTo, parentProcess)();
			}
		}]);

		return Escort;
	}();

	Escort.SINGULAR = bit.create(1); // Repeated execution calls rollback of last progress
	Escort.PROMISE = bit.create(2); // Process become promise
	Escort.WAITTICK = bit.create(3); // Process waits next tick before execution
	Escort.DESCTRUCTOR = Symbol('DESCTRUCTOR');
	var $actual = Symbol('actual');

	Suit = function Suit(handler, bitoptions, context, parent) {
		this.bitoptions = bitoptions || 0;
		this.destructors = []; // List of functions destructors (see .destructor method)
		this.closers = []; // List of functions closers (see .closer method)
		this.context = context || this; // Current context
		this.bitoptions = bitoptions; // Options in bitmask format
		this[$actual] = false;

		if ("function" === typeof handler) {
			/* Assumes that the function immediately available */
			this.compiledHandler = this.compileHandler(handler);
			this.compiledHandler.destroy = function () {
				this.stop();
				this.degrade();
			}.bind(this);
			this.compiledHandler.suit = this;
		} else {
			/* It assumes that the function will be specified later */
			this.compiledHandler = function slot(handler, args) {
				this.compileHandler(handler).apply(this, args);
				if (this.bitoptions & Escort.PROMISE) return this;else return function () {
					this.degrade();
				};
			}.bind(this);
		}
	};

	Suit.prototype = {
		compileHandler: function compileHandler(handler) {
			var self = this;
			return function process() {
				var _this = this;

				var args = Array.prototype.slice.call(arguments);
				self[$actual] = true;
				if (self.bitoptions & Escort.PROMISE) self.clearPromise();
				if (self.destructors.length > 0) {
					//
					self.degrade();
				}
				var result,
				    executor = function executor() {
					try {
						result = handler.apply(_this, [self].concat(args));
						if ("function" === typeof result) self.backtrack(result);
					} catch (e) {
						/* Rollback process */
						self.abort(e);
					}
				};
				if (self.bitoptions & Escort.WAITTICK) {
					setTimeout(executor);
				} else {
					executor();
				}

				if (self.bitoptions & Escort.PROMISE) return self;else return function () {
					self.degrade();
				};
			};
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
			return function () {
				this.degrade();
			}.bind(this);
		},
		track: function track(handler) {
			if (this[$actual]) {
				var result = handler.apply(this);
				if ("function" === typeof result) this.backtrack(result);
			}
		},
		/**
	 * Adds reverse function
	 *
	 * @param {function} handler
	 **/
		backtrack: function backtrack(handler) {
			if (this[$actual]) this.destructors.push(handler);
		},
		/**
	 * Adds closer handler (function that will be called at end)
	 **/
		finally: function _finally(handler) {
			this.closers.push(handler);
		},
		/**
	 * Proceed async. In handler you can use process object as sush as in main process.
	 * 
	 **/
		async: function async(handler) {
			var processor = this,
			    actual = true;
			this.finally(function () {
				return actual = false;
			});
			return function process() {
				if (!actual) return false; // Ignore function if non actual
				try {
					handler.apply(processor.context, [processor].concat(Array.prototype.slice.call(arguments)));
				} catch (e) {
					/* Rollback process */
					processor.abort(e);
				}
			};
		},
		/*
	 Follow another progress (or native promise)
	 This merhod returns promise-like object
	 	increment.follow(new Promise((resolve, reject) => {
	 
	 }))
	 .then(() => {})
	 */
		follow: function follow(promiseLike) {
			var _this2 = this;

			/* Discard promise if it is not actual */
			if (!this[$actual]) {
				if ("function" === typeof promiseLike.abort) promiseLike.abort();
			} else {
				promiseLike.then(function () {}).catch(function () {
					_this2.abort.apply(_this2, arguments);
				});
			}

			/* Listen for reject and make fake promise for output */

			return {
				then: function then(handler) {
					if (_this2[$actual]) promiseLike.then(handler);
					return promiseLike;
				},
				catch: function _catch(handler) {
					if (_this2[$actual]) promiseLike.catch(handler);
					return promiseLike;
				},
				complete: function complete(handler) {
					if (_this2[$actual]) {
						if ("function" === typeof promiseLike.complete) {
							promiseLike.complete(handler);
						} else if ("function" === typeof promiseLike.always) {
							promiseLike.always(_this2.async(handler));
						} else {
							var awaits = true;
							promiseLike.then(function () {
								if (awaits) handler.apply(undefined, arguments);
								awaits = false;
							});
							promiseLike.catch(function () {
								if (awaits) handler.apply(undefined, arguments);
								awaits = false;
							});
						}
					}
					return promiseLike;
				}
			};
		},
		/*
	 Rollback all progress changes
	 */
		degrade: function degrade(reason) {
			this.destructors.reverse().forEach(function (destructor) {
				if ("function" === typeof destructor) destructor();
			});

			this.clear();
		},
		/*
	 Calling when process crashed
	 Invokes $reject
	 */
		abort: function abort(reason) {
			console.warn('Escort aborted: ', reason);
			this.stop();
			this.degrade();

			// Send reject if we are promise
			if (this.bitoptions & Escort.PROMISE) this.$reject(reason instanceof Error ? reason : new Error(reason));
		},
		/*
	 Calling when process successful complete and do not need to do anything in this process (prevent all async functions and subprocesses)
	 */
		success: function success(data) {
			this.stop();
			// Send resolve if we are promise
			if (this.bitoptions & Escort.PROMISE) this.$resolve(data);
		},
		stop: function stop() {
			this[$actual] = false;
			this.closers.forEach(function (closer) {
				closer();
			});
			this.closers = [];
		},
		clear: function clear() {
			// Clear backup
			this.destructors = [];
		},
		/*
	 Executes compiled handler
	 */
		run: function run() {
			this.compiledHandler();

			return this;
		},
		/*
	 * Sends resolve data (process will not stop)
	 */
		resolve: function resolve() {
			this.$resolve.apply(this, Array.prototype.slice.apply(arguments));
		},
		/*
	 * Send reject data (process will not stop)
	 */
		reject: function reject() {
			this.$reject.apply(this, Array.prototype.slice.apply(arguments));
		},
		/**
	 * Clear all Promise queues (resolve, reject, always)
	 **/
		clearPromise: function clearPromise() {
			this.$clearQueues();
		}

	};

	Suit = inherit(Suit, Creed);

	function createSingularMethods() {
		var Component = void 0,
		    methods = void 0;
		if ("function" === typeof arguments[0]) {
			Component = arguments[0];
			methods = "object" === _typeof(arguments[1]) ? arguments[1] : {};
		} else {
			Component = function Component() {
				_classCallCheck(this, Component);
			};
			methods = "object" === _typeof(arguments[0]) ? arguments[0] : {};
		}

		return function (_Component) {
			_inherits(HighOrderSingulars, _Component);

			function HighOrderSingulars() {
				_classCallCheck(this, HighOrderSingulars);

				// List of destructors

				var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(HighOrderSingulars).call(this));

				Object.defineProperty(_this3, $objectSingularDestructors, {
					writable: false,
					editable: false,
					enumerable: false,
					value: []
				});

				Object.defineProperty(_this3, Escort.DESCTRUCTOR, {
					writable: false,
					editable: false,
					enumerable: false,
					value: function value() {
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = _this3[$objectSingularDestructors][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var destroyer = _step.value;

								destroyer();
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
					}
				});

				var _loop = function _loop(methodName) {
					if (methods.hasOwnProperty(methodName)) {

						_this3[methodName] = Escort.factory(methods[methodName].bind(_this3), Escort.SINGULAR, HighOrderSingulars);
						_this3[$objectSingularDestructors].push(function () {
							_this3[methodName].destroy();
						});
					}
				};

				for (var methodName in methods) {
					_loop(methodName);
				}
				return _this3;
			}

			return HighOrderSingulars;
		}(Component);
	}

	Escort.createSingularMethods = createSingularMethods;

	exports.default = Escort;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	var bit = function(bitmask, _) {
		if (this === (function () { return this; })()) {
			if ("function"===typeof bitmask) {
				if ("object"!==typeof bitmask.__bit__) {
					Object.defineProperty(bitmask, '__bit__', {
						enumerable: false,
						writable: false,
						editable: false,
						value: new bit(0, bitmask)
					});

					Object.defineProperty(bitmask, 'bit', {
						enumerable: true,
						configurable: false,
						get: function() {
							return this.__bit__;
						}
					});
				}
				return bitmask.__bit__;
			} else if (arguments.length>1) {
				return new bit(Array.prototype.splice.apply(arguments), false);
			} else {
				return new bit(bitmask instanceof Array ? bit.join(bitmask) : bitmask, _);
			}
		} else {
			this.value = bitmask;
			this._ = _||this;
		}
	}

	// Create new bitmask
	bit.create = function(number) {
		var bitmask = 0;
		Array.prototype.slice.apply(arguments).forEach(function(number) {
			bitmask = bitmask | (1 << number);
		});
		return bitmask;
	}

	// Define global bitmask
	bit.define = function(name, number) {
		!(function() {
			this[name] = 1 << number;
		})(name, number);
	}

	// Join masks to one
	bit.join = function() {
		var result = 0;
		Array.prototype.slice.apply(arguments).forEach(function(mask) {

			result = result | (mask instanceof Array ? bit.join.apply(bit, mask) : mask);
		});
		return result;
	}

	// Make global
	bit.globalize = function() {
		if (!('bit' in Function.prototype))
		Object.defineProperty(Function.prototype, 'bit', {
			enumerable: true,
			configurable: false,
			get: function() {
				if ("object"!==typeof this.__bit__) 
				Object.defineProperty(this, '__bit__', {
					enumerable: false,
					writable: false,
					editable: false,
					value: new bit(0, this)
				});

				return this.__bit__;
			}
		});
		return true;
	}

	var inc = function(bits) {
		if (arguments.length>1) return this.inc.call(this, Array.prototype.splice.apply(arguments));
		this.value = this.value | (bits instanceof Array ? bit.join(bits) : bits);
		return this._;
	};

	var exc = function(bits) {
		if (arguments.length>1) return this.exc.call(this, Array.prototype.splice.apply(arguments));
		this.value = this.value ^ (bits instanceof Array ? bit.join(bits) : bits);
		return this._;
	};

	/*
	Test for bitmask present in current. 
	*/
	var test = function(bits) {
		if (arguments.length===1) {
			if (bits instanceof Array) {
				return this.test.apply(this, bits);
			} else {
				return !!(this.value & bits);
			}
		} else if (arguments.length>1) {
			var result = true, self = this;
			Array.prototype.slice.apply(arguments).forEach(function(mask) {
				if (!(self.value & (mask instanceof Array ? bit.join(mask) : mask))) result = false;
			});
			return result;
		} else {
			return false;
		}
	};

	var havent = function() {
		return !this.test.apply(this, arguments);
	};

	bit.prototype = {
		construct: bit,
		// Override to new bitmask
		set: function(mask) {
			if (arguments.length>1) this.set.call(this, Array.prototype.splice.apply(arguments));
			this.value = mask instanceof Array ? bit.join(mask) : mask;
			return this._;
		},
		// Include bitmask
		inc: inc,
		add: inc,
		// Exclude bitmask
		exc: exc,
		exclude: exc,
		remove: exc,
		// Check entry
		test: test,
		have: test,
		// Check failure
		havent: havent,
		without: havent,
		// Check value exclude bits
		is: function(bits) {
			if (arguments.length>1) return this.is.call(this, Array.prototype.splice.apply(arguments));
			return this.value === (bits instanceof Array ? bit.join(bits) : bits);
		},
		// Сheck the full entry mask is false
		not: function(bits) {
			if (arguments.length>1) return this.is.call(this, Array.prototype.splice.apply(arguments));
			return this.value !== (bits instanceof Array ? bit.join(bits) : bits);
		},
		// Inverse current value
		inverse: function() {
			this.value = ~this.value;
			return this._;
		},
		reset: function() {
			this.value = 0;
			return this._;
		}
	}





	module.exports = bit;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var Promise = __webpack_require__(3).Promise;
	var bit = __webpack_require__(1);
	var mixin = __webpack_require__(8);
	var Polypromise = function() {

	}

	bit.define('POLYPROMISE_IMMEDIATE', 10);

	var CreedPrototype = {
		/*
		Just eval cb like classic promise resolver
		*/
		$eval: function(cb) {
				var self = this;
				this.__credible__.resolver = cb;
				var run = function() {
					cb.call(self, function() {
						self.$resolve.apply(self, arguments);
					}, function(result) { self.$reject.apply(self, arguments); });
				}
				if (bit(cb).test(POLYPROMISE_IMMEDIATE)||this.__credible__.config.immediate) {
					run();
				} else {
					setTimeout(run);
				}
				
				return this;
		},
		/*
		Ignore last pending resolver if got new pending
		*/
		$pending: function(cb) {
				this.__credible__.state=0;
				if (this.__credible__.pending) {
					delete this.__credible__.pending;
				}

				var p = new Creed();
				this.__credible__.pending = p;
				var self = this;
				p.then(function(response) {
					if (self.__credible__.pending===p) // Ignore deprecated pendings
					
					self.$resolve(response);
				})
			.catch(function(response) {
				if (self.__credible__.pending===p) // Ignore deprecated pendings
				self.$reject(response);
			});

			p.$eval(cb);
		},
		$resolve: function() {
			//if (this.__credible__.state!==0) throw 'You can not change Creed state twice';
			this.__credible__.state = 1;
			this.__credible__.data = Array.prototype.slice.apply(arguments);
			for (var i =0;i<this.__credible__.resolveQueue.length;++i) {
				this.__credible__.resolveQueue[i][0].apply(this, this.__credible__.data);
				if (!this.__credible__.resolveQueue[i][1]) {
					this.__credible__.resolveQueue.splice(i, 1);i--;
				}
			}
			this.$complete();
		},
		$reject: function() {
			//if (this.__credible__.state!==0) throw 'You can not change Creed state twice';
			this.__credible__.state = 2;
			this.__credible__.data = Array.prototype.slice.apply(arguments);
			for (var i =0;i<this.__credible__.rejectQueue.length;++i) {
				this.__credible__.rejectQueue[i][0].apply(this, this.__credible__.data);
				if (!this.__credible__.rejectQueue[i][1]) {
					this.__credible__.rejectQueue.splice(i, 1);i--;
				}
			}
			this.$complete();
		},
		$complete: function() {
			for (var i =0;i<this.__credible__.alwaysQueue.length;++i) {
				this.__credible__.alwaysQueue[i][0].apply(this, this.__credible__.data);
				if (!this.__credible__.alwaysQueue[i][1]) {
					this.__credible__.alwaysQueue.splice(i, 1);i--;
				}
			}
		},
		$clearQueues: function() {
			this.__credible__.alwaysQueue = [];
			this.__credible__.rejectQueue = [];
			this.__credible__.resolveQueue = [];
		},
		then: function(cb, stayalive) {
			if (this.__credible__.state===0 || stayalive) this.__credible__.resolveQueue.push([cb, !!stayalive]);
			if (this.__credible__.state===1) {

	            cb.apply(this, this.__credible__.data);
	        }
	        return this;
		},
		catch: function(cb, stayalive) { 
			if (this.__credible__.state===0 || stayalive) this.__credible__.rejectQueue.push([cb, !!stayalive]);
			if (this.__credible__.state===2) cb.apply(this, this.__credible__.data);
			return this;
		},
		complete: function() {
			if (this.__credible__.state===0 || stayalive) this.__credible__.alwaysQueue.push([cb, !!stayalive]);
			if (this.__credible__.state!==0) cb.apply(this, this.__credible__.data);
			return this;
		}
	},
	/**
	* Creed factory
	*
	* @param {Object} custom 
	* - config:immediate {Bool} Always call $eval immediate (without setTimeout)
	**/
	factory = function(custom) {
		/*
		Сredible
		*/
		var Creed = function(cb) {
			Object.defineProperty(this, '__credible__', {
				enumerable: false,
				writable: false,
				configurable: false,
				pending: false,
				resolver: false,
				value: mixin({
					state: 0, // Wait for state
					resolveQueue: [], // Queue of then handler
					rejectQueue: [], // Queue of catch handler
					alwaysQueue: [], // Queue of always handler
					data: [],
					config: mixin({
						immediate: false, // Always call $eval immediate
						manual: false
					}, custom||{})
				}, custom||{})
			});

			if ("function"===typeof cb && !this.__credible__.config.manual) this.$eval(cb);
		};

		Creed.prototype = mixin({}, CreedPrototype, {
			constructor: Creed
		});

		return Creed;
	}


	var Creed = factory();

	/*
	Promises
	*/
	var Promises = function(spawn) {
		// Inherit Creed
		Creed.apply(this);

		this.$promises = [];
		this.$results = [];
		this.$state = 0;
		this.$completed = 0;
		this.$finished = false;
		var self = this;
		var SubPromise = function(cb) {
			if ("object"===typeof window&&this===window||"object"===typeof global&&this===global) {
				var sp = new SubPromise(cb);
			} else {
				// Inherit Creed
				Creed.call(this, cb);
				self.$promises.push(this);
			}
		};

		SubPromise.prototype = Object.create(Creed.prototype, {
			constructor: {
		        value: SubPromise
		    }
		});

		spawn(SubPromise);

		if (this.$promises.length>0)
		for (var i = 0;i<this.$promises.length;++i) {
			this.$promises[i]
			.then(function(io, val) {
				this.$results[io[0]] = val;
				if (!io[1]) { ++this.$completed; io[1]=true; }
				this.$$test();
			}.bind(this, [i,false]), true)
			.catch(function(io, e) {
				this.$results[io[0]] = e;
				this.$state = 2; // Force reject
				if (!io[1]) { ++this.$completed; io[1]=true; }
				this.$$test();
			}.bind(this, [i,false]), true);
		}
		else {
			this.$state = 1; // Force reject
			this.$$test();
		}
	}

	Promises.prototype = Object.create(Creed.prototype, {
		constructor: {
	        value: Promises
	    },
		$$test: {
	        value: function() {
	            if (this.$completed===this.$promises.length) {
	                this.$state = this.$state!==2 ? 1 : 2;
	                this.$finished = true;
	                this[this.$state===1 ? '$resolve' : '$reject'].apply(this, this.$results);
	            }
	        }
	    }
	});


	/*
	Pending
	*/
	var pendings = {}, 
	Pending = function(callback, args) {
		Creed.apply(this);
		this.$id = null;
		var id = callback.toString()+( "object"===typeof args ? JSON.stringify(args) : (args===undefined ? '' : args.toString()) );
		this.$id = id;
		if (pendings[id]) {
			pendings[id].queue.push(this);	} else {

			pendings[id] = {
				queue: [],
				result: null,
				done: 0
			};
			pendings[id].queue.push(this);

			if ("function"===typeof callback) {

	            var promising = new Creed(function(resolve, reject) {
	            	callback(resolve, reject);
	            });
	        } else if ("object"===typeof callback) {
	            var promising = callback;
	        } else {
	            throw 'Pending first argument can be function or Promise, but '+typeof callback+' found';
	        }

			promising.then(function(result) {
				var requeue = pendings[id].queue;
				pendings[id].result = result;
				pendings[id].status = 1;

				for (var i = 0; i < requeue.length;++i) {
					requeue[i].$resolve(result);
				}

				// Clear pending queue list after moment
				setTimeout(function() {
					delete pendings[id];
				});
			})
			.catch(function(result) {
				var requeue = pendings[id].queue;
				pendings[id].result = result;
				pendings[id].status = 2;
				for (var i = 0; i < requeue.length;++i) {
					requeue[i].$reject(result);
				}
				// Clear pending queue list after moment
				setTimeout(function() {
					delete pendings[id];
				});
			});
		}
	};

	Pending.prototype = {
		constructor: Pending,
	    $resolve: function() {
	        if (this.__credible__.state!==0) throw 'You can not change Creed state twice';
	        this.__credible__.state = 1;
	        this.__credible__.data = Array.prototype.slice.apply(arguments);
	        for (var i =0;i<this.__credible__.resolveQueue.length;++i) {
	            this.__credible__.resolveQueue[i][0].apply(this, this.__credible__.data);
	            if (!this.__credible__.resolveQueue[i][1]) {
	                this.__credible__.resolveQueue.splice(i, 1);i--;
	            }
	        }
	    },
	    $reject: function() {
	        if (this.__credible__.state!==0) throw 'You can not change Creed state twice';
	        this.__credible__.state = 2;
	        this.__credible__.data = Array.prototype.slice.apply(arguments);
	        for (var i =0;i<this.__credible__.rejectQueue.length;++i) {
	            this.__credible__.rejectQueue[i][0].apply(this, this.__credible__.data);
	            if (!this.__credible__.rejectQueue[i][1]) {
	                this.__credible__.rejectQueue.splice(i, 1);i--;
	            }
	        }
	    },
	    then: function(cb, stayalive) {
	        if (this.__credible__.state===0) this.__credible__.resolveQueue.push([cb, !!stayalive]);
	        else if (this.__credible__.state===1) cb.apply(this, this.__credible__.data);
	        return this;
	    },
	    catch: function(cb, stayalive) {
	        if (this.__credible__.state===0) this.__credible__.rejectQueue.push([cb, !!stayalive]);
	        else if (this.__credible__.state===2) cb.apply(this, this.__credible__.data);
	        return this;
	    }
	};


	Polypromise.Promise = Creed;
	Polypromise.Promises = Promises;
	Polypromise.Pending = Pending;
	Polypromise.Creed = Creed;
	Polypromise.factory = factory;


	module.exports = Polypromise;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(6);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;

	      var child = new this.constructor(lib$es6$promise$$internal$$noop);

	      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	        lib$es6$promise$$internal$$makePromise(child);
	      }

	      var state = parent._state;

	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }

	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    var lib$es6$promise$$internal$$id = 0;
	    function lib$es6$promise$$internal$$nextId() {
	      return lib$es6$promise$$internal$$id++;
	    }

	    function lib$es6$promise$$internal$$makePromise(promise) {
	      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];
	    }

	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        return new Constructor(function(resolve, reject) {
	          reject(new TypeError('You must pass an array to race.'));
	        });
	      } else {
	        return new Constructor(function(resolve, reject) {
	          var length = entries.length;
	          for (var i = 0; i < length; i++) {
	            Constructor.resolve(entries[i]).then(resolve, reject);
	          }
	        });
	      }
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;


	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	      this._result = this._state = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	        lib$es6$promise$$internal$$makePromise(this.promise);
	      }

	      if (Array.isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._result = new Array(this.length);

	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	      }
	    }

	    function lib$es6$promise$enumerator$$validationError() {
	      return new Error('Array Methods must be provided an Array');
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;

	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;

	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);

	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }

	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(7)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }()), __webpack_require__(5)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 8 */
/***/ function(module, exports) {

	
		var mixinup = function(a,b) { 
			for(var i in b) { 
				
				if (b.hasOwnProperty(i)) { 
		          	
					a[i]=b[i]; 
				} 
			} 
			return a; 
		};

		/*
		Функция слияние двух объектов. Объекты копируются по ссылке, поэтому любые изменения в одном объекте,
		приведут к изменениям во втором.
		Использование:
		mixin(foo, bar1, bar2, bar3 .. barN);
		*/
		module.exports = function(a) { 
			var i=1; 
			for (;i<arguments.length;i++) { 
				if ("object"===typeof arguments[i]) {

					mixinup(a,arguments[i]); 
				} 
			} 
			return a;
		}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var mixin = __webpack_require__(8);

		/*
		Функция наследования одним классом другого. Расширяет прототип и конструктор. 
		Не требует ручного вызова конструктора родительских классов.
		*/
		module.exports = function(aClass, classes) {

			if (!(classes instanceof Array)) classes = [classes];
			var cl=classes.length;
			
			var superconstructor = function(){
				 var args = Array.prototype.slice.apply(arguments);
	            /*
				Поскольку в процессе построения экземпляра будут выполняться функции конструкторы всех наследуемых
				классов, нам необходимо запоминать тех, которые уже были вызваны, во избежании повторного вызова.
				*/
				if ("object"!==typeof this.constructors) Object.defineProperty(this, 'constructors', {
	                configurable: false,
	                enumerable: false,
	                writable: false,
	                value: []
	            });
	               
				for (var i=0;i<cl;++i) {

					/*
					Мы должны помнить какие конструкторы уже были выполнены для этого объект.
					Поэтому всю историю конструкторов необходимо хранить в прототипе,
					во избежании повторного его вызова. Так как мы можем наследовать классы,
					которые происходят от одного предка. В это случае конструктор предка будет
					вызван несколько раз, чего не требуется.
					*/


					if (this.constructors.indexOf(classes[i])>=0) continue;
					this.constructors.push(classes[i]);

					classes[i].apply(this, args);
				}
			},
			superprototype = superconstructor.prototype = {};

			/*
			Первым делом мы должны позаботиться о том, что если у расширяемого класса уже есть __super__ прототип,
			он должен быть перенесен в новый superprototype.
			*/
			if (aClass.prototype&&aClass.prototype!==null&&aClass.prototype.__super__) mixin(superprototype, aClass.prototype.__super__);
			/*
			Мы должны миксировать данный суперпрототип с прототипами всех наследуемых классов,
			а так же с их суперпрототипами. Так как в их прототипе содержатся собственные методы класса,
			а в __super__ миксины тех классов, которые они, возможно наследовали.
			*/
			for (var i=0;i<cl;++i) {
				if (classes[i].prototype) {
					if (classes[i].prototype.__super__) superprototype = mixin(superprototype, classes[i].prototype.__super__);
					superprototype = mixin(superprototype, classes[i].prototype);
				}
			}

			/*
			Мы связывает суперпрототип с суперконструктором.
			*/
			superprototype.constructor = superconstructor;

			/*
			Польскольку мы не можем взять и подменить тело функции у существующей функции,
			нам придется подменить орегинальную функцию на собственную. 
			*/
			var Mixin = function() {

				/*
				Если в прототипе класса вдруг возникла переменная __disableContructor__, значит кто то 
				не хочет, что бы при создании экземпляра класса происходил вызов конструкторов.
				Это может применять в методе construct абстрактного прототипа Function, для вызова
				контруктора через функцию Apply.
				*/
				if (this.constructor && this.constructor.__disableContructor__) {
					this.constructor.__disableContructor__ = false;
					return false;
				}

				var args = Array.prototype.slice.apply(arguments);

				/*
				Мы выполняем расширенные функции только если мы являемся экземпляром Mixin
				*/			
				
				if (! ("object"==typeof window&&(this===window)||"object"==typeof global&&(this===global) )) {
					superconstructor.apply(this, args)
				}

				aClass.apply(this, args);
			}
			Mixin.prototype = Object.create(superprototype, {
				
				/*
				Для быстрого кроссбраузерного доступа к суперпроототипу будет использоваться свойство __super__
				*/
				__super__: {
					configurable: false,
					enumerable: false,
					writable: false,
					value: superprototype
				}
			});
			/*
			Все свойства и методы из старого прототипа мы переносим в новый. Нам необходимо сделать так,
			что бы новый класс ничем не отличался от старого, кроме нового суперпрототипа.
			*/
			if (aClass.prototype) mixin(Mixin.prototype, aClass.prototype);
			/*
			Кроме того, все статичные свойства так же должны быть скопированы
			*/
			for (var prop in aClass) {
				if (aClass.hasOwnProperty(prop)) Mixin[prop] = aClass[prop];
			}
			Object.defineProperty(Mixin.prototype, "constructor", {
				configurable: false,
				enumerable: false,
				writable: false,
				value: Mixin
			});
			/*
			Если браузер не поддерживает __proto__, то мы создадим его, хотя он будет
			являться нечто иным, чем оригинальный __proto__, так как __proto__.__proto__
			не вернет прототип прототипа. 
			*/
			if (!Mixin.prototype.__proto__) {
				Mixin.prototype.__proto__ = Mixin.prototype;
			}

			return Mixin;
		}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])
});
;