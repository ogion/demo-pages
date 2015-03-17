(function() {
	_({
		"status": {
			"code": "OK"
		},
		"id": "54f6fa4ce4b097b21d38c070",
		"bid": {
			"id": "53478578e4b0e8a616cce633",
			"videos": [{
        "videoId": "54eb2523e4b08a86d9eeea16",
        "name": "QA3 feed video",
        "videoUrls": ["http://cdn.vidible.tv/stage/2015-02/23/54eb2523e4b08a86d9eeea16_640x360_v1.mp4", "http://cdn.vidible.tv/stage/2015-02/23/54eb2523e4b08a86d9eeea16_640x360_v1.ogg"],
        "thumbnail": "http://cdn.vidible.tv/stage/2015-02/23/54eb2523e4b08a86d9eeea16_60x60_A_v1.png",
        "fullsizeThumbnail": "http://cdn.vidible.tv/stage/2015-02/23/54eb2523e4b08a86d9eeea16_640x360_A_v1.png",
        "subtitles": [],
        "metadata": {
          "duration": 69008,
          "category": ["category"],
          "content": {
            "Click": ["http://click-100.pix.com", "http://click-200.pix.com"],
            "PlayedTo50Percent": ["http://50.pix.com"],
            "PlayedTo75Percent": ["http://75.pix.com"],
            "PlayedTo100Percent": ["http://100.pix.com"],
            "Impression": ["http://impression.pix.com"],
            "PlayedTo25Percent": ["http://25.pix.com"]
          }
        }
      }]
		},
		"playerTemplate": {
      "nielsenSiteCampaign": 11222,
      "nielsenChannelCampaign": 22211,
			"initialization": "autoplay",
			"sound": "muted",
			"initialVolume": 1.0,
			"videosToPlay": 1,
			"videosToRequest": 1,
			"shuffleVideos": false,
			"prerollFrequency": 0,
			"backgroundSkinLocation": {
				"x": 0,
				"y": 0,
				"w": 0,
				"h": 0
			},
			"controlsSkinLocation": {
				"x": 0,
				"y": 323,
				"w": 640,
				"h": 0
			},
			"videoLocation": {
				"x": 0,
				"y": 0,
				"w": 640,
				"h": 360
			},
			"afterVideosUI": "next",
			"scrubBarSkin": "http://cdn.vidible.tv/dev/2013-12/06/52a1dc56300424977848f7df_v1.swf",
			"coveringsSkin": "http://cdn.vidible.tv/stage/2015-03/02/5469c1eee4b0393d1df1cc3a_v50.swf",
			"coveringsSkinLocation": {
				"x": 0,
				"y": 0,
				"w": 640,
				"h": 360
			},
			"surroundSkinLocation": {
				"x": 0,
				"y": 0,
				"w": 0,
				"h": 0
			},
			"playerWidth": 640,
			"playerHeight": 360,
			"controlsAutoPosition": true,
			"controlsChromeless": true,
			"controlsBackgroundAlpha": "1.0",
			"backgroundFill": true,
			"backgroundColor": 0,
			"surround3DBevelShadowColor": 16777215,
			"surround3DBevelHighlightColor": 16777215,
			"surroundInnerRadius": 0,
			"surroundCornerRadius": 0,
			"surroundHole": false,
			"surround3D": false,
			"surround3DBevelSize": 0,
			"surround3DBevelStrength": 0.0,
      "jsExtras": [{
        "coreJsUrl": "http://cdn.vidible.tv/stage/js/extras/nielsen.js"
      }],
			"HLSExtra": "http://cdn.vidible.tv/stage/2015-03/02/5422fb8486f2114b63e770e0_v72.swf",
			"IMAExtra": "http://cdn.vidible.tv/stage/2015-03/02/5422fb8486f2114b63e770d0_v63.swf",
			"YuMeExtra": "http://cdn.vidible.tv/stage/2015-03/02/5422fb8486f2114b63e770e5_v52.swf",
			"FreeWheelExtra": "http://cdn.vidible.tv/stage/2015-03/02/5422fb8486f2114b63e770e4_v55.swf",
			"VASTExtra": "http://cdn.vidible.tv/stage/2015-03/02/5422fb8486f2114b63e77116_v67.swf",
			"UIExtra": "http://cdn.vidible.tv/stage/2015-03/02/54cb4157e4b040120cdde2e5_v37.swf",
			"publisherPayout": "None",
			"publisherAmount": 0.0,
			"metaData": {
				"vidible.AD_START": "http://test.com"
			},
			"showLogo": false,
			"PlayerAdSystem": "http://cdn.vidible.tv/stage/2015-03/02/54c0edd3e4b041cfff703b35_v17.swf"
		},
		"adSettings": {
			"podSize": 1,
			"prerollInterleave": 1,
      "midrollTiming": '20%',
			"softTimeout": 0.4,
			"hardTimeout": 3.2,
			"startTimeout": 19.200000000000003,
			"companions": [],
			"aeg": [
				[{
					"name": "qwe",
					"type": "All",
					"vendor": "54f446ade4b097b21d385392",
					"url": "http://ad4.liverail.com/?LR_PUBLISHER_ID=1331&LR_SCHEMA=vast2-vpaid",
					"slot": {
						"position": "FULL"
					},
					"allowMultiburn": true,
					"priorityBoost": 1.0,
					"strictSiteCheck": false,
					"usesShim": false,
					"enabled": true,
					"startTimeout": 20.0,
					"houseAd": false
				}]
			],
			"asids": []
		},
		"playerWidget": {
			"playerType": "SMART",
			"url": "http://cdn.vidible.tv/stage/2015-03/05/53496cbee4b08e89da5675ce_v286.swf",
			"adOnly": false
		},
		"geo": {
			"country": "rus",
			"region": "oms",
			"zipCode": "644033",
			"areaCode": "0",
			"connSpeed": "broadband"
		}
	});

	function _(json) {
		/*
     Developed by Robert Nyman, http://www.robertnyman.com
     Code/licensing: http://code.google.com/p/getelementsbyclassname/
     */
		var getElementsByClassName = function(className, tag, elm) {
			if (document.getElementsByClassName) {
				getElementsByClassName = function(className, tag, elm) {
					elm = elm || document;
					var elements = elm.getElementsByClassName(className),
						nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
						returnElements = [],
						current;
					for (var i = 0, il = elements.length; i < il; i += 1) {
						current = elements[i];
						if (!nodeName || nodeName.test(current.nodeName)) {
							returnElements.push(current);
						}
					}
					return returnElements;
				};
			} else if (document.evaluate) {
				getElementsByClassName = function(className, tag, elm) {
					tag = tag || "*";
					elm = elm || document;
					var classes = className.split(" "),
						classesToCheck = "",
						xhtmlNamespace = "http://www.w3.org/1999/xhtml",
						namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
						returnElements = [],
						elements,
						node;
					for (var j = 0, jl = classes.length; j < jl; j += 1) {
						classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
					}
					try {
						elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
					} catch (e) {
						elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
					}
					while ((node = elements.iterateNext())) {
						returnElements.push(node);
					}
					return returnElements;
				};
			} else {
				getElementsByClassName = function(className, tag, elm) {
					tag = tag || "*";
					elm = elm || document;
					var classes = className.split(" "),
						classesToCheck = [],
						elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
						current,
						returnElements = [],
						match;
					for (var k = 0, kl = classes.length; k < kl; k += 1) {
						classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
					}
					for (var l = 0, ll = elements.length; l < ll; l += 1) {
						current = elements[l];
						match = false;
						for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
							match = classesToCheck[m].test(current.className);
							if (!match) {
								break;
							}
						}
						if (match) {
							returnElements.push(current);
						}
					}
					return returnElements;
				};
			}
			return getElementsByClassName(className, tag, elm);
		};
		var cl = "vdb_54f6fa4ce4b097b21d38c07050d595ec0364e95588c77bd2";
		var c = getElementsByClassName(cl, null, document.body)[0];
		c.className = c.className.replace(new RegExp("(\\s*)" + cl + "\\s*", "g"), "$1");
		var p = c.getAttribute("vdb_params") || "";
		var cb = /(?:[\?&]|^)m\.cb=(.*?)(&m\..*?=|$)/g.exec(p);
		cb = cb && cb[1] || Math.random();
		var ur = /(?:[\?&]|^)m\.url=(.*?)(&m\..*?=|$)/g.exec(p);
		ur = ur && ur[1];

		function ee(pn, v, dv) {
			var ve = dv && dv(v) || v;
			if (ve == v) {
				try {
					ve = decodeURIComponent(v);
					ve = encodeURIComponent(ve);
				} catch (e) {
					ve = encodeURIComponent(v);
				}
			}
			p = p.replace("m." + pn + "=" + v, "m." + pn + "=" + ve);
			v = ve;
			return v;
		}

		ee("url", ur);
		p += p && "&";
		var ifr = window != top;
		var r = encodeURIComponent(ifr ? document.referrer : location.href);
		var i = document.createElement("img");
		var it = new Date().getTime();
		i.src = "http://trk.dev.vidible.tv/trk/impression.gif?pid=54f6fa4ce4b097b21d38c070&bcid=50d595ec0364e95588c77bd2&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r;
		i = document.createElement("img");
		i.src = "http://trk.dev.vidible.tv/trk/js-loaded.gif?pid=54f6fa4ce4b097b21d38c070&bcid=50d595ec0364e95588c77bd2&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r;
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "http://cdn.vidible.tv/stage/js/vidible-min.js?pid=54f6fa4ce4b097b21d38c070&bcid=50d595ec0364e95588c77bd2&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r;
		s.onload = function() {
			var pl = vidible.createPlayer({
				apid: "",
				pid: "54f6fa4ce4b097b21d38c070",
				bcid: "50d595ec0364e95588c77bd2",
				params: p,
				content: c,
				it: it,
				site: r
			}, json, {
				cdn: "http://cdn.vidible.tv/stage/",
				trk: "http://trk.dev.vidible.tv/trk/",
				ds: "http://delivery.dev.vidible.tv/",
				ptv: "http://portal.dev.vidible.tv/"
			});
			var i = document.createElement("img");
			i.src = "http://trk.dev.vidible.tv/trk/js-started.gif?pid=54f6fa4ce4b097b21d38c070&bcid=50d595ec0364e95588c77bd2&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r;
			var clb = window['vidibleInitialize'];
			if (clb) {
				clb(pl);
			}
			s.onload = s.onreadystatechanged = function() {};
		};
		s.onreadystatechange = function() {
			if (s.readyState == 'complete' || s.readyState == 'loaded') {
				s.onload();
			}
		};
		c.appendChild(s);
	}
})();
