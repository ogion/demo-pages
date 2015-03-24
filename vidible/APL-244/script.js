(function() {
	_({
		"status": {
			"code": "OK"
		},
		"id": "55114140e4b0c35b50a26e41",
		"bid": {
			"id": "551140dfe4b0dba8eff1efda",
			"videos": [{
				"videoId": "55113fbee4b0856472fb9027",
				"name": "Sanity",
				"videoUrls": ["http://cdn.vidible.tv/prod/2015-03/24/55113fbee4b0856472fb9027_300x250_v1.mp4", "http://cdn.vidible.tv/prod/2015-03/24/55113fbee4b0856472fb9027_300x250_v1.ogg"],
				"thumbnail": "http://cdn.vidible.tv/prod/2015-03/24/55113fbee4b0856472fb9027_60x60_A_v1.png",
				"fullsizeThumbnail": "http://cdn.vidible.tv/prod/2015-03/24/55113fbee4b0856472fb9027_o_A_v1.png",
				"subtitles": [],
				"metadata": {
					"commonRating": {
						"value": "G",
						"descriptors": [],
						"minAge": 0
					},
          "category": ["category"],
          "content": {
            "Click": ["http://click-100.pix.com", "http://click-200.pix.com"],
            "PlayedTo50Percent": ["http://50.pix.com"],
            "PlayedTo75Percent": ["http://75.pix.com"],
            "PlayedTo100Percent": ["http://100.pix.com"],
            "Impression": ["http://impression.pix.com"],
            "PlayedTo25Percent": ["http://25.pix.com"]
          },
					"duration": 211557
				}
			}]
		},
		"playerTemplate": {
      "nielsenSiteCampaign": 11222,
      "nielsenChannelCampaign": 22211,
			"initialization": "autoplay",
			"sound": "normal",
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
			"controlsSkin": "http://cdn.vidible.tv/prod/2015-03/24/53bba5abe4b048c7bb7a99cd_v67.swf",
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
			"scrubBarSkin": "http://cdn.vidible.tv/prod/2013-03/10/511e8160e4b0bf40bd0340a7_v2.swf",
			"coveringsSkin": "http://cdn.vidible.tv/prod/2015-03/24/511c1ecee4b0c704f12cfd7a_v39.swf",
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
      "jsExtras": [{
        "coreJsUrl": "http://cdn.vidible.tv/prod/js/extras/nielsen.js"
      }],
			"surround3DBevelShadowColor": 16777215,
			"surround3DBevelHighlightColor": 16777215,
			"surroundInnerRadius": 0,
			"surroundCornerRadius": 0,
			"surroundHole": false,
			"surround3D": false,
			"surround3DBevelSize": 0,
			"surround3DBevelStrength": 0.0,
			"publisherPayout": "None",
			"publisherAmount": 0.0,
			"metaData": {
				"videostart": "http://impr.test.com",
				"freeWheelProfile": "3pqa_profile",
				"VIDEO_META": "http://video.meta.com",
				"freeWheelNetworkId": "90750",
				"adStart": "http://test.com/cody"
			},
			"showLogo": false,
			"HLSExtra": "http://cdn.vidible.tv/prod/2015-03/24/538d8a72e4b078ca3e653bf8_v57.swf",
			"IMAExtra": "http://cdn.vidible.tv/prod/2015-03/24/53281496e4b07ed088dcc112_v87.swf",
			"YuMeExtra": "http://cdn.vidible.tv/prod/2015-03/24/53e1c7cbe4b07ee7365f29d0_v40.swf",
			"FreeWheelExtra": "http://cdn.vidible.tv/prod/2015-03/24/53ea27a4e4b07b82e79a9a93_v37.swf",
			"VASTExtra": "http://cdn.vidible.tv/prod/2015-03/24/515ec96fe4b0d3d2531c453c_v152.swf",
			"PlayerAdSystem": "http://cdn.vidible.tv/prod/2015-03/24/54c0f57ee4b0cd706d4b0655_v11.swf",
			"UIExtra": "http://cdn.vidible.tv/prod/2015-03/24/54dc812ce4b0d09a18e61231_v10.swf"
		},
		"adSettings": {
			"podSize": 1,
			"prerollInterleave": 1,
			"softTimeout": 0.4,
			"hardTimeout": 3.2,
			"startTimeout": 19.200000000000003,
			"companions": [],
			"aeg": [],
			"asids": []
		},
		"playerWidget": {
			"playerType": "SMART",
			"url": "http://cdn.vidible.tv/prod/2015-03/24/511b13fde4b0c704f12cfd68_v280.swf",
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
		i.src = "http://trk.vidible.tv/trk/impression.gif?pid=55114140e4b0c35b50a26e41&bcid=50d595ec0364e95588c77bd2&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r;
		i = document.createElement("img");
		i.src = "http://trk.vidible.tv/trk/js-loaded.gif?pid=55114140e4b0c35b50a26e41&bcid=50d595ec0364e95588c77bd2&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r;
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "http://cdn.vidible.tv/prod/js/vidible-min.js?pid=55114140e4b0c35b50a26e41&bcid=50d595ec0364e95588c77bd2&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r;
		s.onload = function() {
			var pl = vidible.createPlayer({
				apid: "",
				pid: "55114140e4b0c35b50a26e41",
				bcid: "50d595ec0364e95588c77bd2",
				params: p,
				content: c,
				it: it,
				site: r
			}, json, {
				cdn: "http://cdn.vidible.tv/prod/",
				trk: "http://trk.vidible.tv/trk/",
				ds: "http://delivery.vidible.tv/",
				ptv: "http://portal.vidible.tv/"
			});
			var i = document.createElement("img");
			i.src = "http://trk.vidible.tv/trk/js-started.gif?pid=55114140e4b0c35b50a26e41&bcid=50d595ec0364e95588c77bd2&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r;
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
