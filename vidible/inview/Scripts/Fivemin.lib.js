if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.LIB) == "undefined") {
	FIVEMIN.LIB = (function () {
		/* Built with DEVIGN js fw, extended by Eli Sklar and Dylan Kennet */
		FIVEMIN.LIB = function () {
			var af = function () { }; // Anonymous function that does nothing

			var $ = function () { return $.getById.apply(this, arguments); };

			$.extend = function (destination, source) {
				for (var key in (source || {})) {
					destination[key] = source[key];
				}
				return destination;
			};

			var docForRestore;

			$.extend($, {
				// elements
				document: document,
				// elements
				getById: function (id, doc) {
					return id ? id.nodeName ? id : (doc || document).getElementById(id) : null;
				},
				create: function (tag, props, doc) {
					var el = (doc || $.document || document).createElement(tag);
					if (props) { $.alter(el, props); }
					return el;
				},
				setDocument: function (doc) {
					docForRestore = $.document || document; $.document = doc;
				},
				restoreDocument: function () { $.document = docForRestore; docForRestore = null; },
				alter: function (el, props) {
					if (!props) { return null; }
					if (props.styles) {
						$.css(el, props.styles);
						delete props.styles;
					}
					if (props.events) {
						$.each(props.events, function (handler, name) { $.addEvent(el, name, handler); });
						delete props.events;
					}
					if (props.children) {
						$.each(props.children, function (child) { el.appendChild(child); });
						delete props.children;
					}
					var parent = props.parent;
					delete props.parent;

					$.extend(el, props);

					if (parent) { parent.appendChild(el); }

					return el;
				},
				// ----------------------------------------------------------
				// If you're not in IE (or IE version is less than 5) then:
				//     ie === undefined
				// If you're in IE (>5) then you can determine which version:
				//     ie === 7; // IE7
				// Thus, to detect IE:
				//     if (ie) {}
				// And to detect the version:
				//     ie === 6 // IE6
				//     ie> 7 // IE8, IE9 ...
				//     ie <9 // Anything less than IE9
				// ----------------------------------------------------------
				ie: (function () {
					var rv = null; // Return value assumes failure.
					if (navigator.appName == 'Microsoft Internet Explorer') {
						rv = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent);
						if (rv[1] != null) rv = parseFloat(rv[1]);
						else rv = null;
					}
					return rv;
				} ()),


				/**
				* Remove an element (backward compatibility)
				* @param el
				*/
				removeNode: function (el) {
					if (el.parentNode) { el.parentNode.removeChild(el); }
				},

				getElement: function (selector, ctx) {
					return $.getElements(selector, ctx)[0];
				},
				getElements: function (selector, ctx) {
					if (!ctx) { ctx = $.document || document; }

					var result = [];

					if (selector.indexOf(".") > -1) {
						for (
						var split = selector.split("."),
							re = new RegExp("\\b" + split[1] + "\\b"),
							list = ctx.getElementsByTagName(split[0] || "*"),
							length = list.length,
							i = 0,
							j = 0,
							node;
						i < length;
						++i
					) {
							node = list[i];
							if (re.test(node.className)) {
								result[j++] = node;
							}
						}
					}
					else { result = $.toArray(ctx.getElementsByTagName(selector)); }

					return result;
				},

				hasChild: function (parent, el) {
					if ($.browser.features.xpath == false) { return $.indexOf($.toArray(parent.getElementsByTagName(el.tagName)), el) > -1; }
					return parent.contains ? parent != el && parent.contains(el) : !!(parent.compareDocumentPosition(el) & 16);
				},

				/**
				* Attach an event to an element
				* Params:
				*
				* @see window.addEventListener
				* @param Element
				* @param Event
				* @param Callback
				* 
				*/
				addEvent: function (el, name, fn) {
					var eventFunc;
					if (name == "mouseenter") {
						name = "mouseover";
						eventFunc = function (event) {
							var related = event.relatedTarget;
							var fireEvent;
							if (related == undefined) fireEvent = true;
							else if (related === false) fireEvent = false;
							else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
							if (fireEvent) fn(event);
							return fireEvent;
						};
					}
					else if (name == "mouseleave") {
						name = "mouseout";
						eventFunc = function (event) {
							var related = event.relatedTarget;
							var fireEvent;
							if (related == undefined) fireEvent = true;
							else if (related === false) fireEvent = false;
							else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
							if (fireEvent) fn(event);
							return fireEvent;
						};
					} else eventFunc = fn;
					document.addEventListener ?  el.addEventListener(name, eventFunc, false) : el.attachEvent("on" + name, eventFunc) ;
				},
				removeEvent: function (el, name, fn) {
					var eventFunc;
					if (name == "mouseenter") {
						name = "mouseover";
						eventFunc = function (event) {
							var related = event.relatedTarget;
							var fireEvent;
							if (related == undefined) fireEvent = true;
							else if (related === false) fireEvent = false;
							else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
							if (fireEvent) fn();
							return fireEvent;
						};
					}
					else if (name == "mouseleave") {
						name = "mouseout";
						eventFunc = function (event) {
							var related = event.relatedTarget;
							var fireEvent;
							if (related == undefined) fireEvent = true;
							else if (related === false) fireEvent = false;
							else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
							if (fireEvent) fn();
							return fireEvent;
						};
					}
					else eventFunc = fn;
					document.removeEventListener ? el.removeEventListener(name, eventFunc, false) :  el.detachEvent("on" + name, eventFunc) ;
				},

				dispatchEvent: function(element,eventName,args) {
                    var event;
                    if (document.createEvent) {
                        event = document.createEvent("HTMLEvents");
                        event.initEvent(eventName, true, true);
                    } else {
                        event = document.createEventObject();
                        event.eventType = eventName;
                    }

                    event.eventName = eventName;
                    event.args = args || { };

                    if (document.createEvent) {
                        element.dispatchEvent(event);
                    } else {
                        if (typeof(element["on" + eventName]) != 'undefined' ) {
                            element.fireEvent("on" + eventName, event);
                        }
                    }
                },

				stopEvent: function (e, preventDefault, stopPropagation) {
					if (preventDefault !== false) {
						if (e.preventDefault) { e.preventDefault(); }
						else { e.returnValue = false; }
					}
					if (stopPropagation !== false) {
						if (e.stopPropagation) { e.stopPropagation(); }
						else { e.cancelBubble = true; }
					}
				},
				eventElement: function (e) { return e.target ? e.target : e.srcElement; },

				// arrays/objects
				toArray: function (data) {
					if (data instanceof Array) { return data; }
					if (data.item) {
						var array = [];
						for (var i = 0, l = data.length; i < l; i++) { array[i] = data[i]; }
						return array;
					}
					return Array.prototype.slice.call(data);
				},
				indexOf: function (data, item, from) {
					var len = data.length;
					for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++) {
						if (data[i] === item) { return i; }
					}
					return -1;
				},
				removeItem: function (arr, item) {
					for (var i = arr.length; i--; ) {
						if (arr[i] === item) { arr.splice(i, 1); }
					}
				},
				each: function (data, fn, bind) {
					if (data instanceof Array) {
						for (var i = 0; i < data.length; i++) { fn.call(bind || null, data[i], i); }
					}
					else {
						for (var key in data) { fn.call(bind || null, data[key], key); }
					}
					return data;
				},

				trim: function (s) { return s.replace(/^\s+|\s+$/g, ""); },
				etrim: function (str, chars) {
					if (typeof str !== 'string') return str;
					return $.ltrim($.rtrim(str, chars), chars);
				},

				ltrim: function (str, chars) {
					chars = chars || "\\s";
					return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
				},

				rtrim: function (str, chars) {
					chars = chars || "\\s";
					return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
				},

				time: function () { return new Date().getTime(); },

				map: function (data, fn, bind) {
					var a = data instanceof Array ? [] : {};
					$.each(data, function (value, key) {
						a[key] = fn.call(bind || null, value, key);
					});
					return a;
				},
				css: function (el, style) {
					if (el instanceof Array) {
						for (var index = 0; index < el.length; ++index) {
							var item = el[index];
							$.css(item, style);
						}
						return null;
					}
					else if (typeof (style) == "string") { el.style.cssText = style; }
					else {
						if (style.opacity !== undefined) {
							$.opacity(el, style.opacity);
							delete style.opacity;
						}

						style = $.map(style, function (value, key) {
							if ($.indexOf(cssNumericValue, key) != -1) { return parseFloat(value); }
							if ($.indexOf(cssPixelValue, key) != -1 && typeof (value) == "number") { return value + "px"; }
							return value;
						});
						$.extend(el.style, style);
					}
					return el;
				},

				hide: function (el) {
					if (el instanceof Array) {
						for (var i = 0; i < el.length; ++i) {
							$.hide(el[i]);
						}
						return;
					}
					el.style.display = 'none';
				},

				show: function (el) {
					el.style.display = 'block';
				},

				docSize: function (doc) {
					var intH = 0, intW = 0;

					if (self.innerHeight) {
						intH = window.innerHeight;
						intW = window.innerWidth;
					}
					else {
						if (doc.documentElement && doc.documentElement.clientHeight) {
							intH = doc.documentElement.clientHeight;
							intW = doc.documentElement.clientWidth;
						}
						else {
							if (document.body) {
								intH = doc.body.clientHeight;
								intW = doc.body.clientWidth;
							}
						}
					}

					if (intH < doc.body.clientHeight) {
						intH = doc.body.clientHeight;
					}

					return {
						height: parseInt(intH, 10),
						width: parseInt(intW, 10)
					};
				},

				addCls: function (el, cls) {
					if (!$.hasCls(el, cls)) { el.className += " " + cls; }
				},
				removeCls: function (el, cls) {
					el.className = el.className.replace(new RegExp("(^|\\s+)" + cls + "(\\s+|$)", "g"), " ");
				},
				hasCls: function (el, cls) {
					return new RegExp("(^|\\s)" + cls + "(\\s|$)").test(el.className);
				},

				currCss: function (el, key, toNumber) {
					if (key == "float") { key = "cssFloat"; }

					if (key == "opacity" && $.browser.name == "ie") { return $.opacity(el); }

					var result;

					if (el.currentStyle) {
						result = el.currentStyle[key.replace(/-\D/g, function (match) {
							return match.charAt(1).toUpperCase();
						})];
					}
					else {
						var computed = el.ownerDocument.defaultView.getComputedStyle(el, null);
						result = computed ? computed.getPropertyValue(key) : null;
					}

					if (result == "auto" && (key == "width" || key == "height")) {
						result = el["offset" + key.charAt(0).toUpperCase() + key.substr(1)];
						var removePadding = key == "width" ? ["left", "right"] : ["top", "bottom"];
						result -= $.currCss(el, removePadding[0]) + $.currCss(el, removePadding[1]);
						if (result < 0) { result = 0; }
					}

					if (
					result !== null &&
					(
						$.indexOf(cssPixelValue, key) != -1 ||
						$.indexOf(cssNumericValue, key) != -1 ||
						toNumber ||
						result.indexOf("px") == result.length - 2
					)
				) { result = parseFloat(result); }

					return $.etrim(result, "'\"");
				},

				opacity: function (el, value) {
					if (value === undefined) { // get
						if ($.browser.name != "ie") { return $.currCss(el, "opacity"); }
						var filter = el.style.filter;
						return filter && filter.indexOf("opacity=") >= 0 ? (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) : 1;
					}
					else { // set
						if (value == 0) {
							if (el.style.visibility != 'hidden') { el.style.visibility = 'hidden'; }
						} else {
							if (el.style.visibility != 'visible') { el.style.visibility = 'visible'; }
						}
						if (!el.currentStyle || !el.currentStyle.hasLayout) { el.style.zoom = 1; }
						if ($.browser.name == "ie") { el.style.filter = value == 1 ? '' : 'alpha(opacity=' + value * 100 + ')'; }
						el.style.opacity = value;
					}
					return null;
				},

				offset: function (el) {
					var curtop, curleft = curtop = 0;
					if (el.offsetParent) {
						do {
							curleft += el.offsetLeft;
							curtop += el.offsetTop;
						} while (el = el.offsetParent);
					}
					return { left: curleft, top: curtop };
				},
				//get current dimensions and position of an element
			    //usage:   var dims = new ElementDimensions(elementToMeasure);
				
				height : function(element) {
				    if (window.self == element) {
				        return this.getDocHeight();
				    } else {
				        return element.clientHeight;
				    }
				},
				width: function (element) {
				    if (window.self == element) {
				        return this.getDocWidth();
				    } else {
				        return element.clientWidth;
				    }
				},

				getDocWidth: function () {
				    var D = document;
				    return Math.max(
                    D.body.scrollWidth, D.documentElement.scrollWidth,
                    D.body.offsetWidth, D.documentElement.offsetWidth,
                    D.body.clientWidth, D.documentElement.clientWidth
                        );
				},

				getDocHeight :function() {
                var D = document;
		        return Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
                    );
		        },
				dimensions: function (elem) {
					var coords = {};
					coords.inner = {	//content and padding; gives 0 for inline elements (you can use scrollWidth/Height if it's inline)
						width: elem.clientWidth,
						height: elem.clientHeight
					};
					coords.outer = {	//everything (content, padding, scrollbar, border)
						width: elem.offsetWidth,
						height: elem.offsetHeight
					};
					coords.scroll = {
						//width & height of entire content field (including padding), visible or not
						//incorrect in Opera; it doesn't include the padding
						width: elem.scrollWidth,
						//if there are no scrollbars, IE gives the actual height of the content instead of the height of the element
						height: elem.scrollHeight < elem.clientHeight ? elem.clientHeight : elem.scrollHeight,

						//scroll position of content & padding
						left: elem.scrollLeft,
						top: elem.scrollTop
					};

					//position of element from the top-left corner of the document
					var tmp = elem;
					coords.left = coords.top = 0;
					while (tmp.offsetParent) {
						coords.left += tmp.offsetLeft;
						coords.top += tmp.offsetTop;
						tmp = tmp.offsetParent;
					}

					return coords;
				},

				/**
				* Bind a function to a specific this object
				* @param function
				* @param bind object
				*/
				bind: function (fn, bind) {
					return function () {
						fn.apply(bind, arguments);
					};
				},

				/**
				* Spawns separate function call that waits for check to be true
				* @param check - function that returns true or false
				* @param onComplete - function to call when check is true
				* @param delay - how long to wait between checks (in ms)
				* @param timeout - how long before giving up
				* @param bind - the bind for this for the onComplete function
				* @param args - arguments to pass to the onComplete function
				*/
				waitUntil: function (check, onComplete, delay, timeout, bind, args) {
					if (!bind) bind = this;
					if (!args) args = [];
					// if the check returns true, execute onComplete immediately
					if (check()) {
						onComplete.apply(bind, args);
						return;
					}

					if (!delay) delay = 100;

					var timeoutPointer;
					var intervalPointer = setInterval(function () {
						if (!check()) return; // if check didn't return true, means we need another check in the next interval

						// if the check returned true, means we're done here. clear the interval and the timeout and execute onComplete
						clearInterval(intervalPointer);
						if (timeoutPointer) clearTimeout(timeoutPointer);
						onComplete.apply(bind, args);
					}, delay);
					// if after timeout milliseconds function doesn't return true, abort
					if (timeout) timeoutPointer = setTimeout(function () {
						clearInterval(intervalPointer);
					}, timeout);
				},

				htmlenc: function (s) {
					return s ? s.replace(/&/g, "&amp;")
                   .replace(/</g, "&lt;")
                   .replace(/>/g, "&gt;")
                   .replace(/'/g, "&apos;")
                   .replace(/"/g, "&quot;") : "";
				},

				addStylesheet: function (href, media, doc) {
					if (doc == null) doc = document;
					var head = doc.getElementsByTagName('head')[0];

					var links = doc.getElementsByTagName('link');
					for (var i = 0; i < links.length; ++i) {
						var tempLink = links[i];

						if (tempLink.getAttribute('href') == href) {
							return true;
						}
					}

					var link = doc.createElement('link');
					link.rel = 'stylesheet';
					link.href = href;
					link.type = 'text/css';
					link.media = media || 'all';
					head.appendChild(link);
					return true;
				},

				log: function () {
					if (typeof (console) == "undefined") { return; }
					try { console.log.apply(console, arguments); }
					catch (ex) { console.log($.toArray(arguments)); }
				},

				/**
				* Same thing as $.log function, but uses the info functio
				* that also shows the line from where it was fired.
				*
				* @param mixed
				*/
				l: function () {
					if (typeof (console) == 'undefined') { return af; }
					return console.info;
				} (),

				d: function () {
					if (typeof (console) == 'undefined') { return af; }
					return console.dir;
				} (),

				prepend: function (parentEl, newChild) {
					var firstChild = parentEl.firstChild;
					if (typeof firstChild != "undefined") {
						parentEl.insertBefore(newChild, firstChild);
					}
					else {
						parentEl.appendChild(newChild);
					}
				},

				getViewport: function () {

					var viewPortWidth;
					var viewPortHeight;

					// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
					if (typeof window.innerWidth != 'undefined') {
						viewPortWidth = window.innerWidth;
						viewPortHeight = window.innerHeight;
					}

					// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
					else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
						viewPortWidth = document.documentElement.clientWidth;
						viewPortHeight = document.documentElement.clientHeight;
					}

					// older versions of IE
					else {
						viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
						viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
					}
					return { 'width': viewPortWidth, 'height': viewPortHeight };
				},

				// Randomizes an array using Fisher-Yates shuffle algorithm
				randomizeArray: function (oldArray) {
					var i = oldArray.length;
					if (i == 0) return [];
					while (--i) {
						var j = Math.floor(Math.random() * (i + 1));
						var tempi = oldArray[i];
						var tempj = oldArray[j];
						oldArray[i] = tempj;
						oldArray[j] = tempi;
					}
					return oldArray;
				},

				// Convert a hex value to its decimal value - the inputted hex must be in the
				// format of a hex triplet - the kind we use for HTML colours. The function
				// will return ([255,255,255] - [Reg, Green, Blue]) an array with three values.
				hex2num: function (hex) {
					if (hex.charAt(0) == "#") hex = hex.slice(1); //Remove the '#' char - if there is one.
					hex = hex.toUpperCase();
					var hexAlphabets = "0123456789ABCDEF";
					var value = new Array(3);
					var k = 0;
					var int1, int2;
					for (var i = 0; i < 6; i += 2) {
						int1 = hexAlphabets.indexOf(hex.charAt(i));
						int2 = hexAlphabets.indexOf(hex.charAt(i + 1));
						value[k] = (int1 * 16) + int2;
						k++;
					}
					return (value);
				},

				// Give a array ([255,255,255] - [Reg, Green, Blue]) with three values as the argument and the function will return
				// the corresponding hex triplet.
				num2hex: function (triplet) {
					var hexAlphabets = "0123456789ABCDEF";
					var hex = "#";
					var int1, int2;
					for (var i = 0; i < 3; i++) {
						int1 = triplet[i] / 16;
						int2 = triplet[i] % 16;

						hex += hexAlphabets.charAt(int1) + hexAlphabets.charAt(int2);
					}
					return (hex);
				},

				md5: function (strToMd5) {
					var hexcase = 0; function hex_md5(a) { return rstr2hex(rstr_md5(str2rstr_utf8(a))) } function hex_hmac_md5(a, b) { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(b))) } function md5_vm_test() { return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72" } function rstr_md5(a) { return binl2rstr(binl_md5(rstr2binl(a), a.length * 8)) } function rstr_hmac_md5(c, f) { var e = rstr2binl(c); if (e.length > 16) { e = binl_md5(e, c.length * 8) } var a = Array(16), d = Array(16); for (var b = 0; b < 16; b++) { a[b] = e[b] ^ 909522486; d[b] = e[b] ^ 1549556828 } var g = binl_md5(a.concat(rstr2binl(f)), 512 + f.length * 8); return binl2rstr(binl_md5(d.concat(g), 512 + 128)) } function rstr2hex(c) { try { hexcase } catch (g) { hexcase = 0 } var f = hexcase ? "0123456789ABCDEF" : "0123456789abcdef"; var b = ""; var a; for (var d = 0; d < c.length; d++) { a = c.charCodeAt(d); b += f.charAt((a >>> 4) & 15) + f.charAt(a & 15) } return b } function str2rstr_utf8(c) { var b = ""; var d = -1; var a, e; while (++d < c.length) { a = c.charCodeAt(d); e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0; if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) { a = 65536 + ((a & 1023) << 10) + (e & 1023); d++ } if (a <= 127) { b += String.fromCharCode(a) } else { if (a <= 2047) { b += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63)) } else { if (a <= 65535) { b += String.fromCharCode(224 | ((a >>> 12) & 15), 128 | ((a >>> 6) & 63), 128 | (a & 63)) } else { if (a <= 2097151) { b += String.fromCharCode(240 | ((a >>> 18) & 7), 128 | ((a >>> 12) & 63), 128 | ((a >>> 6) & 63), 128 | (a & 63)) } } } } } return b } function rstr2binl(b) { var a = Array(b.length >> 2); for (var c = 0; c < a.length; c++) { a[c] = 0 } for (var c = 0; c < b.length * 8; c += 8) { a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << (c % 32) } return a } function binl2rstr(b) { var a = ""; for (var c = 0; c < b.length * 32; c += 8) { a += String.fromCharCode((b[c >> 5] >>> (c % 32)) & 255) } return a } function binl_md5(p, k) { p[k >> 5] |= 128 << ((k) % 32); p[(((k + 64) >>> 9) << 4) + 14] = k; var o = 1732584193; var n = -271733879; var m = -1732584194; var l = 271733878; for (var g = 0; g < p.length; g += 16) { var j = o; var h = n; var f = m; var e = l; o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936); l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586); m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819); n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330); o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897); l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426); m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341); n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983); o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416); l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417); m = md5_ff(m, l, o, n, p[g + 10], 17, -42063); n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162); o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682); l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101); m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290); n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329); o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510); l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632); m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713); n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302); o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691); l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083); m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335); n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848); o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438); l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690); m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961); n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501); o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467); l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784); m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473); n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734); o = md5_hh(o, n, m, l, p[g + 5], 4, -378558); l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463); m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562); n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556); o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060); l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353); m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632); n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640); o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174); l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222); m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979); n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189); o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487); l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835); m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520); n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651); o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844); l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415); m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905); n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055); o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571); l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606); m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523); n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799); o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359); l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744); m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380); n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649); o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070); l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379); m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259); n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551); o = safe_add(o, j); n = safe_add(n, h); m = safe_add(m, f); l = safe_add(l, e) } return Array(o, n, m, l) } function md5_cmn(h, e, d, c, g, f) { return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d) } function md5_ff(g, f, k, j, e, i, h) { return md5_cmn((f & k) | ((~f) & j), g, f, e, i, h) } function md5_gg(g, f, k, j, e, i, h) { return md5_cmn((f & j) | (k & (~j)), g, f, e, i, h) } function md5_hh(g, f, k, j, e, i, h) { return md5_cmn(f ^ k ^ j, g, f, e, i, h) } function md5_ii(g, f, k, j, e, i, h) { return md5_cmn(k ^ (f | (~j)), g, f, e, i, h) } function safe_add(a, d) { var c = (a & 65535) + (d & 65535); var b = (a >> 16) + (d >> 16) + (c >> 16); return (b << 16) | (c & 65535) } function bit_rol(a, b) { return (a << b) | (a >>> (32 - b)) };
					return hex_md5(strToMd5);
				},

				rand: function () {
					/* RNG SECTION */
					var mathRng, whatwgRng = null;
					// Math.random()-based RNG.  All platforms, very fast, unknown quality
					var rndBytes = new Array(16);
					mathRng = function () {
						var r, b = rndBytes, i;

						for (var i = 0, r; i < 16; i++) {
							if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
							b[i] = r >>> ((i & 0x03) << 3) & 0xff;
						}

						return b;
					};

		try {
		    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
		    // WebKit only (currently), moderately fast, high quality
		    if (window.crypto && window.crypto.getRandomValues) {
		        var rnds = new Uint32Array(4);
		        whatwgRng = function () {
		            window.crypto.getRandomValues(rnds);
		            var random = [];
		            for (var c = 0; c < 16; c++) {
		                random[c] = rnds[c >> 2] >>> ((c & 0x03) * 8) & 0xff;
		            }
		            return random;
		        };
		    }
		} catch (e) {

		} 

					// Select RNG with best quality
					var rng = whatwgRng || mathRng;
					FIVEMIN.LIB.rand = rng;
					return rng();
				},

				timer: function () {
					var startTimeStamp;
					return {
						start: function () {
							startTimeStamp = new Date().getTime();
						},

						getStatus: function () {
							var now = new Date().getTime();
							var seconds = (now - startTimeStamp) / 1000;
							return seconds;
						}
					};
				} (),

				isDecendant: function (decendant, ancestor) {
					var isDecendant = false;
					do {
						if (decendant == ancestor) {
							isDecendant = true;
							break;
						}
						decendant = decendant.parentNode;
					}
					while (decendant.tagName.toLowerCase() != "html")

					return isDecendant;
				},

				getTopMostWindow: function () {
					var currP = window;
					while (currP) {
						try {
							var newP = currP.parent;
							// try to reach the document, if didn't succeed - goes to catch {}
							var doc = newP.document;
							if (!doc) break;
							// reached the top
							// newP is ok. use it.
							currP = newP;
							if (newP == newP.parent) break;

						} catch (ex) {
							break;
						}
					}
					$.getTopMostWindow = function () { return currP; };
					return currP;
				},

				_parseQueryString: function (query) {
					var params = {};
					query.replace(/(.*?)=(.*?)(?:&|$)/g, function (match, key, value) {
						params[key/*.toLowerCase()*/] = decodeURIComponent(value);
					});
					return params;
				},

				//Returns true if it is a DOM element
				isElement: function (o) {
					return (
						typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
						typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string"
					);
				},

				_getQueryString: function () {
					if (!$._getQueryString._overwritten) {
						$._getQueryString._overwritten = true;

						var queryString = $._parseQueryString(location.search.substr(1));
						$._getQueryString = function (key, def) {
							key = key.toLowerCase();
							return (queryString[key] === undefined ? def : queryString[key]) || "";
						};
						return $._getQueryString.apply(null, arguments);
					}
					return null;
				}
			});

			$.browser = {};

			(function () {
				/* Borrowed from MooTools Browser object */
				var ua = navigator.userAgent.toLowerCase(),
					platform = navigator.platform.toLowerCase(),
					ua2 = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0],
					mode = ua2[1] == 'ie' && document.documentMode;
				$.browser.name = (ua2[1] == 'version') ? ua2[3] : ua2[1];
				$.browser.version = mode || parseFloat((ua2[1] == 'opera' && ua2[4]) ? ua2[4] : ua2[2]);
				$.browser.platform = {
					name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0],
					version: androidOS() || iPadOS() || iPhoneOS() || ""
				};
				$.browser.features = {
					xpath: !!(document.evaluate),
					air: !!(window.runtime),
					query: !!(document.querySelector),
					json: !!(window.JSON)
				};
				$.browser[$.browser.name] = true;
				$.browser[$.browser.name + parseInt($.browser.version, 10)] = true;
				$.browser.platform[$.browser.platform.name] = true;
			})();

			function androidOS() {
				var match;
				var version = navigator.userAgent.match('Android') ? 1.0 : false;
				if (match = /Android (\d+(?:\.\d+)+)/.exec(navigator.userAgent)) {
					var split = match[1].split('.');
                    version = 0;
                    var mult = 1;
                    for (var i = 0; i < split.length; i++) {
                        version += parseInt(split[i]) / mult;
                        mult *= 10;
                    }
				}
				return version;

			};

			function iPadOS() {
				var match;
				var version = navigator.userAgent.match('iPad') ? 1.0 : false;
				if (match = /CPU OS (.*) like Mac OS X/.exec(navigator.userAgent)) {
					version = parseInt(match[1].replace('_', ''), 10) / 100;
					if (version < 1) {
						version *= 10;
					}
				}
				return version;
			};

			function iPhoneOS() {
				var match;
				var version = navigator.userAgent.match('iPod') || navigator.userAgent.match('iPhone') ? 1.0 : false;
				if (match = /iPhone OS (.*) like Mac OS X/.exec(navigator.userAgent)) {
					version = parseInt(match[1].replace('_', ''), 10) / 100;
					if (version < 1) {
						version *= 10;
					}
				}
				return version;
			};

			(function () {
				var loaded,
				observers = [];

				$.extend($, {
					addDomReady: function (fn) {
						if (loaded) { return fn(); }

						observers[observers.length] = fn;

						if (!domReadyInitialized) {
							domReadyInitialized = true;
							initDomReady();
						}
						return true;
					}
				});

				var domReadyInitialized;
				function initDomReady() {
					if ($.document == null) $.document = document;
					if ($.document.readyState == "loaded" || $.document.readyState == "complete") { domready(); }

					if ($.browser.name == "ie") {
						var temp = $.create('div');
						(function () {
							var success = false;
							try {
								temp.doScroll('left');
								$.document.body.appendChild(temp);
								temp.innerHTML = "temp";
								$.removeNode(temp);
								success = true;
							} catch (ex) {
								setTimeout(arguments.callee, 500);
							}

							if (success) { domready(); }
						})();
					} else if ($.browser.features.query == false) {
						(function () {
							if ($.document.readyState == "loaded" || $.document.readyState == "complete") { domready(); }
							else { setTimeout(arguments.callee, 500); }
						})();
					} else {
						if ($.document.readyState == "loaded" || $.document.readyState == "complete") { domready(); }
						else {
							$.addEvent(window, 'load', domready);
							$.addEvent(document, 'DOMContentLoaded', domready);
						}
					}

					function domready() {
						if (loaded) { return; }
						loaded = true;
						$.each(observers, function (fn) {
							fn();
						});
					}
				}
			})();

			$.jsonpCallbacks = {};

			// options: bind, pass, preventCache
			$.jsonp = function (url, callback, options) {
				if (options == null) options = {};
				if (callback != null) {
					if (typeof callback != "string") {
						var rand = options.callbackName || "j" + Math.random().toString().substring(5);
						var func;
						if (options.bind) {
							func = function (data) { FIVEMIN.LIB.bind(callback, options.bind)(1, data, options.pass); };
						} else {
							func = function (data) { callback(1, data, options.pass); };
						}
						$.jsonpCallbacks[rand] = func;
						url += (url.indexOf("?") > -1 ? "&" : "?") + "callback=FIVEMIN.LIB.jsonpCallbacks['" + rand + "']";
					} else {
						url += (url.indexOf("?") > -1 ? "&" : "?") + "callback=" + callback;
					}
				}
				if (options.preventCache) { url += "&rnd=" + new Date().getTime(); } // prevent caching

				var head = $.getElement("head") || $.document.body || $.document.documentElement;

				$.create("script", {
					src: url,
					type: "text/javascript",
					parent: head
				});
			};

			$.toQueryString = function (params) {
				var arr = [];
				$.each(params, function (value, key) {
					if (typeof value == 'function' || value == null) return;
					arr.push(key + "=" + encodeURIComponent(value+''));
				});
				return arr.join("&");
			};

			var cssPixelValue = "left,top,bottom,right,width,height,maxWidth,maxHeight,minWidth,minHeight,fontSize,letterSpacing,lineHeight,margin,marginLeft,marginRight,marginTop,marginBottom,padding,paddingLeft,paddingRight,paddingTop,paddingBottom,borderWidthLeft,borderWidthRight,borderWidthTop,borderWidthBottom".split(",");
			var cssNumericValue = "z-index,font-weight,opacity,zoom,line-height".split(",");

			return $;
		} ();

		return FIVEMIN.LIB;
	})();
}
if (typeof (FIVEMIN.LIB.Helpers) == "undefined") {
	FIVEMIN.LIB.Helpers = {
		getRnd: function(s) { var a = s.split(","); return a[Math.floor(Math.random() * a.length)]; }
		, getHead: function() { var $ = FIVEMIN.LIB; return $.getElement("head") || $.document.body || $.document.documentElement; }
	};
}