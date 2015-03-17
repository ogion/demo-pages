if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.LIB) == "undefined") { FIVEMIN.LIB = {}; }
if (typeof (FIVEMIN.LIB.Fx) == 'undefined')
{
	FIVEMIN.LIB.Fx = function () {
		var defaultOptions = {
			duration: 500,
			fps: 50
		};
		function fx(element, options, baseOptions) {
			this.element = element;
			this.options = {};
			this.setOptions(defaultOptions);
			this.setOptions(baseOptions);
			this.setOptions(options);
			if (typeof this.options.transition == 'string') {
				this.options.transition = eval("FIVEMIN.LIB.Fx.Transitions." + this.options.transition);
			}
		}
		fx.prototype = {
			setOptions: function (options) {
				if (options == null) return;
				for (var opts in options) {
					if (options[opts] != null) this.options[opts] = options[opts];
				}
			},
			transition: function (p) {
				if (this.options.transition) return this.options.transition(p);
				return -(Math.cos(Math.PI * p) - 1) / 2;
			},
			start: function (to, callback) {
				if (this.timer) { return false; }
				var self = this;
				this.to = to;
				this.from = this.getFrom();
				this.startTime = new Date().getTime();
				this.endTime = this.startTime + this.options.duration;
				this.timer = setInterval(function () { self.step(); }, Math.round(1000 / this.options.fps));
				if (callback != null) callback();
				return this;
			},
			stop: function () {
				if (!this.timer) { return false; }
				clearInterval(this.timer);
				this.timer = null;
				return true;
			},
			cancel: function () {
				this.stop();
				if (this.options.onCancel) { this.options.onCancel.call(this); }
			},
			complete: function () {
				this.set(1);
				this.stop();
				if (this.options.onComplete) { this.options.onComplete.call(this); }
			},
			step: function () {
				var time = new Date().getTime();
				if (time < this.endTime) {
					var percentage = this.transition((time - this.startTime) / this.options.duration);
					this.set(percentage);
				}
				else { this.complete(); }
			},
			getFrom: function () {
				var from = {};
				for (var key in this.to) {
					from[key] = FIVEMIN.LIB.currCss(this.element, key);
					if (key == "marginLeft" && isNaN(from[key])) {
						from[key] = FIVEMIN.LIB.currCss(this.element, "margin-left");
					}
				}
				return from;
			},
			set: function (p) {
				var style = {};
				for (var key in this.to) {
					var value = this.to[key];
					style[key] = (value - this.from[key]) * p + this.from[key];
					if (key !== "opacity") { style[key] = Math.floor(style[key]); }
				}
				FIVEMIN.LIB.css(this.element, style);
			}
		};

		return fx;
	} ();

	FIVEMIN.LIB.Fx.Transition = function (transition, params) {
		params = typeof (params) != 'array' ? [params] : params;
		transition.easeIn = function (pos) {
			return transition(pos, params);
		};
		transition.easeOut= function (pos) {
			return 1 - transition(1 - pos, params);
		};
		transition.easeInOut= function (pos) {
			return (pos <= 0.5) ? transition(2 * pos, params) / 2 : (2 - transition(2 * (1 - pos), params)) / 2;
		};
		return transition;
	};

	FIVEMIN.LIB.Fx.Transitions = {};

	FIVEMIN.LIB.Fx.Transitions.extend = function (transitions) {
		for (var transition in transitions) FIVEMIN.LIB.Fx.Transitions[transition] = new FIVEMIN.LIB.Fx.Transition(transitions[transition]);
	};

	FIVEMIN.LIB.Fx.Transitions.extend({

		Pow: function (p, x) {
			return Math.pow(p, x[0] || 6);
		},

		Expo: function (p) {
			return Math.pow(2, 8 * (p - 1));
		},

		Circ: function (p) {
			return 1 - Math.sin(Math.acos(p));
		},

		Sine: function (p) {
			return 1 - Math.sin((1 - p) * Math.PI / 2);
		},

		Back: function (p, x) {
			x = x[0] || 1.618;
			return Math.pow(p, 2) * ((x + 1) * p - x);
		},

		Bounce: function (p) {
			var value = 0;
			for (var a = 0, b = 1; 1; a += b, b /= 2) {
				if (p >= (7 - 4 * a) / 11) {
					value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
					break;
				}
			}
			return value;
		},

		Elastic: function (p, x) {
			return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
		},

		Quad: function (p) {
			return Math.pow(p, 2);
		},
		Cubic: function (p) {
			return Math.pow(p, 3);
		},
		Quart: function (p) {
			return Math.pow(p, 4);
		},
		Quint: function (p) {
			return Math.pow(p, 5);
		}
	});
}