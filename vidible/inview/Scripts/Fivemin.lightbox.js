/* ~/Scripts/Fivemin.Lightbox.js */

if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.Lightbox) == "undefined") {
    FIVEMIN.Lightbox = function () {
        var getTopMostWindow = function () {
            var currP = window;
            while (currP) {
                try {
                    var newP = currP.parent;
                    // try to reach the document, if didn't succeed - goes to catch {}a
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
            getTopMostWindow = function () { return currP; };
            return currP;
        };
        var targetDoc = document;
        var $ = FIVEMIN.LIB;
        var cssPrefix = "fmts-lb-";
        var contentCSSPrefix = cssPrefix + "cn-";
        var offsetFromTop = 30;

        function addStylesheet(href, media, doc) {
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
        }
        addStylesheet(FIVEMIN.BaseConfig.urls.shared + FIVEMIN.BaseConfig.Lightbox.css, 'all', targetDoc);

        function lightbox(options, instanceNumber) {
            var self = this;
            options = $.extend({}, options);
            if (options) {
                cssPrefix = options.CSS_PREFIX ? options.CSS_PREFIX : cssPrefix;
                contentCSSPrefix = options.CONTENT_CSS_PREFIX ? options.CONTENT_CSS_PREFIX : contentCSSPrefix;
                offsetFromTop = options.OFFSET_FROM_TOP ? options.OFFSET_FROM_TOP : offsetFromTop;
            }

            if (document.URL.indexOf("render=overlay") !== -1) { //Drupal Iframe fix
                targetDoc = document;
                offsetFromTop = 117;
            } else {
                targetDoc = getTopMostWindow().document;
            }


            this.instanceNumber = instanceNumber;
            var randomId = parseInt(Math.random(10000) * 10000);
            var animType = options.lightboxAnim;
            var onHideStart = options.onHideStart;
            var onShowStart = options.onShowStart;
            var onHideComplete = options.onHideComplete;
            var onShowComplete = options.onShowComplete;
            var customShow = options.customShow;
            var customHide = options.customHide;
            var identifier = "FIVEMIN_Lightbox_" + randomId;

            try {
                getTopMostWindow()[identifier] = this;
            } catch (e) { alert(e); }

            this.box = new box();
            this.box.init({
                animConfig: {
                    duration: 300,
                    type: animType,
                    onHideStart: function (ev) {
                        if (onHideStart) onHideStart.call(self, ev);
                    },
                    onHideComplete: function (ev) {
                        self.overlay.hide();
                        if (onHideComplete) onHideComplete.call(self, ev);
                    },
                    onShowStart: function (ev) {
                        if (onShowStart) onShowStart.call(self, ev);
                    },
                    onShowComplete: function (ev) {
                        if (onShowComplete) onShowComplete.call(self, ev);
                    },
                    customShow: customShow,
                    customHide: customHide
                },
                hideFunc: function () {
                    self.hide();
                },
                instanceNumber: instanceNumber
            });

            this.overlay = new overlay();
            this.overlay.init({
                opacity: options.overlayOpacity || 0.5,
                bgColor: options.overlayColor || "#000000",
                animConfig: {
                    duration: 300,
                    onShowComplete: function () {
                        $.restoreDocument();
                    }
                },
                onClickFunc: function () {
                    self.hide();
                }
            });

            $.addEvent(targetDoc, "keydown", function (ev) {
                self.hideOnEsc(ev);
            });
            $.restoreDocument();
        }

        lightbox.prototype = {
            constructor: lightbox.constructor,

            clear: function () {
                this.box.clear();
                delete this.box;

                this.overlay.clear();
                delete this.overlay;
            },

            setTitle: function (title) {
                this.box.setTitle(title);
            },

            show: function (cfg) {
                cfg = cfg || {};
                $.setDocument(targetDoc);
                var self = this;
                this.overlay.show({
                    onShowComplete: function () {
                        self.box.show(cfg);
                    }
                });
            },

            hideOnEsc: function (e) {
                var keyId = (window.event) ? window.event.keyCode : e.keyCode;

                if (keyId == 27) {
                    this.hide();
                }
            },

            hide: function () {
                this.box.hide();
            }
        };

        function box() {
            var element,
			animConfig,
			titleEl,
			contentEl,
			contentBody,
			displayed = false;

            return {
                clear: function () {
                    if (this.element) {
                        this.element.parentNode.removeChild(this.element);
                        delete this.element;
                    }

                    if (this.iframe) {
                        this.iframe.parentNode.removeChild(this.iframe);
                        delete this.iframe;
                    }

                    if (this.boxShadow && this.boxShadow.getElement()) {
                        this.boxShadow.getElement().parentNode.removeChild(this.boxShadow.getElement());
                        delete this.boxShadow;
                    }
                },
                init: function (cfg) {
                    animConfig = cfg.animConfig;

                    if (animConfig.type == 2 || animConfig.type == 3) {
                        this.boxShadow.init();
                    }

                    var dimen = $.docSize(targetDoc);

                    // Element
                    element = targetDoc.createElement('div');
                    element.setAttribute('id', contentCSSPrefix + "wrapper");
                    $.addCls(element, contentCSSPrefix + "wrapper");
                    targetDoc.body.appendChild(element);

                    this.element = element;

                    // iFrame to block objects
                    this.iframe = $.create("iframe", {
                        parent: targetDoc.body,
                        'id': contentCSSPrefix + "iframe",
                        'name': contentCSSPrefix + "iframe",
                        'src': 'javascript:void(0);',
                        'frameborder': 0,
                        'scrolling': 'no',
                        'styles': {
                            'position': 'fixed',
                            'top': '-20px',
                            'left': '-20px',
                            'filter': 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)',
                            'opacity': 0,
                            'width': '100%', //dimensions.width + 'px',
                            'height': dimen.height + 'px', //dimensions.height + 'px',
                            'zIndex': 1,
                            'visibility': '',
                            'display': 'none'
                        }
                    });
                    // Top image
                    $.create("div", { className: cssPrefix + "top", parent: element });
                    //Content
                    contentEl = $.create("div", { className: cssPrefix + "cn", parent: element });
                    // Title wrapper
                    var titleWrapper = $.create("div", { className: cssPrefix + "title-wrapper", parent: contentEl });
                    // Title
                    titleEl = $.create("div", {
                        className: contentCSSPrefix + "title",
                        parent: titleWrapper
                    });
                    // Close button
                    $.create("div", {
                        className: contentCSSPrefix + "close",
                        innerHTML: "X",
                        parent: titleWrapper,
                        events: {
                            click: cfg.hideFunc
                        }
                    });
                    // Content Body
                    contentBody = $.create("div", { className: cssPrefix + "body", parent: contentEl });
                    // Bottom image
                    $.create("div", { className: cssPrefix + "bottom", parent: element });
                },

                show: function (cfg) {
                    var self = this;
                    this.iframe.style.display = '';
                    if (cfg.position != null) {
                        this.element.style.position = cfg.position;
                        if (cfg.position == 'absolute') this.element.style.top = this._getTopPos() + "px";
                        else if (cfg.position == 'fixed') {
                            this.element.style.top =     offsetFromTop != undefined &&  offsetFromTop != null   ? offsetFromTop + "px" : "30px";
                        }
                    }
                    else this.element.style.top = this._getTopPos() + "px";
                    this.setTitle(cfg.title);

                    if (typeof (cfg.body == "string")) contentBody.innerHTML = cfg.body;
                    else if (typeof (cfg.body == "object")) contentBody.appendChild(cfg.body);

                    if (cfg.width != null) this.element.style.width = cfg.width;

                    if (animConfig.onShowStart) { animConfig.onShowStart(this); }
                    if (animConfig.customShow) {
                        animConfig.customShow(this,
                        function () {
                            if (animConfig.onShowComplete) {
                                animConfig.onShowComplete.call(self);
                            }
                            if (cfg.onShowComplete) {
                                cfg.onShowComplete.call(self);
                                displayed = true;
                            }
                        });
                    } else {
                        var boxShadow = this.boxShadow.getElement();
                        switch (animConfig.type) {
                            // fade                                                      
                            case 1:
                                $.css(this.element, { 'style': 0 });
                                this.element.style.display = "block";
                                new $.Fx(this.element, {
                                    duration: animConfig.duration,
                                    onComplete: function () {
                                        if (animConfig.onShowComplete) {
                                            animConfig.onShowComplete();
                                        }
                                        if (cfg.onShowComplete) {
                                            cfg.onShowComplete();
                                            displayed = true;
                                        }
                                    }
                                }).start({
                                    opacity: 1
                                });
                                break;
                            // grow                                                      
                            case 2:
                                $.css(boxShadow, {
                                    width: 0,
                                    height: 0,
                                    marginLeft: 0,
                                    top: this._getTopPos() + 360,
                                    display: "block",
                                    opacity: 0
                                });
                                new $.Fx(boxShadow, {
                                    duration: 200,
                                    onComplete: function () {
                                        boxShadow.style.display = "none";
                                        element.style.display = "block";
                                        if (animConfig.onShowComplete) {
                                            animConfig.onShowComplete();
                                        }
                                        if (cfg.onShowComplete) {
                                            cfg.onShowComplete();
                                            displayed = true;
                                        }
                                    }
                                }).start({
                                    width: 813,
                                    height: 630,
                                    marginLeft: -406,
                                    top: this._getTopPos() + 7,
                                    opacity: 0.7
                                });
                                break;
                            // windows7                                                      
                            case 3:
                                $.css(boxShadow, {
                                    width: 740,
                                    height: 560,
                                    marginLeft: -370,
                                    top: this._getTopPos() + 35,
                                    display: "block",
                                    opacity: 0
                                });
                                new $.Fx(boxShadow, {
                                    duration: 400,
                                    onComplete: function () {
                                        boxShadow.style.display = "none";
                                        element.style.display = "block";
                                        if (animConfig.onShowComplete) {
                                            animConfig.onShowComplete();
                                        }
                                        if (cfg.onShowComplete) {
                                            cfg.onShowComplete();
                                            displayed = true;
                                        }
                                    }
                                }).start({
                                    width: 813,
                                    height: 630,
                                    marginLeft: -406,
                                    top: this._getTopPos() + 7,
                                    opacity: 0.85
                                });
                                break;
                            // no effect                                                      
                            case 0:
                            default:
                                this.element.style.display = "block";
                                if (animConfig.onShowComplete) {
                                    animConfig.onShowComplete();
                                }
                                if (cfg.onShowComplete) {
                                    cfg.onShowComplete();
                                    displayed = true;
                                }
                        }
                    }
                },

                hide: function () {
                    if (!displayed) { return; }
                    this.iframe.style.display = 'none';
                    if (animConfig.onHideStart) { animConfig.onHideStart(this); }
                    if (animConfig.customHide) { animConfig.customHide(this, animConfig.onHideComplete); }
                    else {
                        var boxShadow = this.boxShadow.getElement();
                        switch (animConfig.type) {
                            // fade                                                      
                            case 1:
                                new $.Fx(this.element, {
                                    onComplete: $.bind(function () {
                                        this.element.style.display = "none";
                                        contentBody.innerHTML = "";
                                        if (animConfig.onHideComplete) {
                                            animConfig.onHideComplete();
                                        }
                                    }, this),
                                    duration: animConfig.duration
                                }).start({
                                    opacity: 0
                                });
                                break;
                            // shrink                                                      
                            case 2:
                                this.element.style.display = "none";
                                contentBody.innerHTML = "";
                                $.css(boxShadow, {
                                    display: "block",
                                    top: this._getTopPos() + 7
                                });
                                new $.Fx(boxShadow, {
                                    duration: 200,
                                    onComplete: function () {
                                        if (animConfig.onHideComplete) {
                                            animConfig.onHideComplete();
                                        }
                                    }
                                }).start({
                                    width: 0,
                                    height: 0,
                                    marginLeft: 0,
                                    top: this._getTopPos() + 360,
                                    opacity: 0
                                });
                                break;
                            // windows7                                                      
                            case 3:
                                $.css(boxShadow, {
                                    width: 813,
                                    height: 630,
                                    marginLeft: -406,
                                    top: this._getTopPos() + 7,
                                    opacity: 0.85,
                                    display: "block"
                                });
                                this.element.style.display = "none";
                                contentBody.innerHTML = "";
                                new $.Fx(boxShadow, {
                                    duration: 400,
                                    onComplete: function () {
                                        if (animConfig.onHideComplete) {
                                            animConfig.onHideComplete();
                                        }
                                    }
                                }).start({
                                    width: 740,
                                    height: 560,
                                    marginLeft: -370,
                                    top: this._getTopPos() + 35,
                                    opacity: 0
                                });
                                break;
                            // no effect                                                      
                            case 0:
                            default:
                                this.element.style.display = "none";
                                contentBody.innerHTML = "";
                                if (animConfig.onHideComplete) {
                                    animConfig.onHideComplete();
                                }
                        }
                    }
                    displayed = false;
                },

                setTitle: function (title) {
                    titleEl.innerHTML = title || '';
                },

                getElement: function () {
                    return element;
                },

                _getTopPos: function () {
                    var document = targetDoc;
                    var scrollTop = function () {
                        if (typeof pageYOffset != 'undefined') {
                            //most browsers
                            return pageYOffset;
                        }
                        else {
                            return (document.documentElement.clientHeight) ? document.documentElement.scrollTop : document.body.scrollTop; // IE with or without DOCTYPE
                        }
                    } ();
                    scrollTop += offsetFromTop;
                    return scrollTop;
                },

                boxShadow: function () {
                    var shadowElement;

                    return {
                        init: function () {
                            shadowElement = $.create("div", {
                                id: contentCSSPrefix + "shadow",
                                className: contentCSSPrefix + "shadow",
                                parent: targetDoc.body
                            });
                        },
                        getElement: function () {
                            return shadowElement;
                        }
                    };
                } ()
            };
        }

        function overlay() {
            var opacity,
			element,
			animConfig;

            var updateDimensions = function () {
                if ($.browser.ie && $.browser.version < 8) {
                    var dimensions = $.docSize(targetDoc);
                    this.element.style.height = dimensions.height + "px";
                    this.element.style.width = dimensions.width + "px";
                }
            };

            return {
                clear: function () {
                    element.parentNode.removeChild(element);
                    delete element;
                    delete opacity;
                    delete animConfig;
                },
                init: function (cfg) {
                    animConfig = cfg.animConfig;
                    opacity = cfg.opacity;

                    element = $.create("div", {
                        id: cssPrefix + "overlay",
                        className: cssPrefix + "overlay",
                        parent: targetDoc.body,
                        styles: {
                            "backgroundColor": cfg.bgColor
                        }
                    });

                    $.addEvent(element, "click", cfg.onClickFunc);
                },

                show: function (cfg) {
                    updateDimensions();
                    $.css(element, { opacity: 0, display: "block" });
                    new $.Fx(element, {
                        onComplete: $.bind(function () {
                            if (animConfig.onShowComplete) {
                                animConfig.onShowComplete();
                            }
                            if (cfg.onShowComplete) {
                                cfg.onShowComplete();
                            }
                        }, this),
                        duration: animConfig.duration
                    }).start({
                        opacity: opacity
                    });
                },

                hide: function () {
                    new $.Fx(element, {
                        onComplete: function () {
                            element.style.display = "none";
                        },
                        duration: animConfig.duration
                    }).start({
                        opacity: 0
                    });
                }
            };
        }

        return lightbox;
    } ();
}