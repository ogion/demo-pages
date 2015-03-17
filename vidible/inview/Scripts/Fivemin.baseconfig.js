/**
 * Generic Config
 */
if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.BaseConfig) == 'undefined') {
    FIVEMIN.BaseConfig = { };
}

if (typeof (FIVEMIN.BaseConfig.ExecCommands) == 'undefined') {
    FIVEMIN.BaseConfig.MinimumFlashVersion = "9.0.115";
    FIVEMIN.BaseConfig.NextMinFlashVersion = "10.3";
    FIVEMIN.BaseConfig.UseFlashProxy = false;
    FIVEMIN.BaseConfig.FlashProxyUrl = "flashproxy/flashproxy.swf";
	FIVEMIN.BaseConfig.PlayerEvents= {
        ready: 1,
        videoDataLoaded: 2,
        play: 4,
        pause: 8,
        progress: 16,
        userSearch: 32,
        timeUpdate: 64,
        videoStartPlay: 128,
        adStart: 256,
        adEnd: 512
	};
	FIVEMIN.BaseConfig.ExecCommands= [
	 	'ToggleEmbedCodeDialog',
	 	'ToggleDirectLinkDialog',
	 	'ToggleSendFriendDialog',
	 	'VideoPlay',
	 	'VideoPause',
	 	'VideoMute',
	 	'VideoVolume',
	 	'ToggleCaptions',
	 	'VideoSeekTo',
	 	'VideoRewind'
	];
}

if (typeof (FIVEMIN.BaseConfig.Lightbox) == 'undefined') {
    FIVEMIN.BaseConfig.Lightbox = {
        css: "CSS/Lightbox.css"
    };
}

if (typeof (FIVEMIN.BaseConfig.VideoSection) == 'undefined') {
    FIVEMIN.BaseConfig.VideoSection = {
        defaults: {
            textColor: "#006699",
            pageBgColor: "#FFFFFF",
            playerColor: "#006699",
            pageWidth: 975,
            categories: []
        },

        schemeLists: {
            "default": ["#191919", "#7EC359", "#E50030", "#006699", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9"],
            textColor: ["#006699", "#191919", "#E50030", "#7EC359", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9"],
            pageBgColor: ["#FFFFFF", "#191919", "#7EC359", "#E50030", "#006699", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9"],
            playerColor: ["#006699", "#191919", "#E50030", "#7EC359", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9", "#FFFFFF"]
        },

        maxPageWidth: 1200,
        minPageWidth: 955
    };
}

if (typeof (FIVEMIN.BaseConfig.Logger) == 'undefined') {
    FIVEMIN.BaseConfig.Logger = {
        LogLevel: -1,
        LogServer: ('https:' == document.location.protocol ? "https:" : "http:") + "//l.5min.com",
        Enums: {
            broVer: {
                unknown: 0,
                ie: 1,
                firefox: 2,
                chrome: 3,
                safari: 4
            },
            osVer: {
                unknown: 0,
                win: 1,
                mac: 2,
                linux: 3,
                webos: 4,
                android: 5,
                ios: 6
            },
        	pt: {
        		flash: 1,
        		html5: 2,
        		chromeless: 3
        	},
            rType: {
                noResults: 0,
                success: 1,
                timeout: 2
            },
            content: {
                featured: 0,
                seed: 1,
                playlist: 2,
            	videogroup: 3
            },
            embCont: {
                single: 0,
                playlist: 1
            },
            pgLoc: {
                topLeft: 0,
                topCenter: 1,
                topRight: 2,
                bottomLeft: 3,
                bottomCenter: 4,
                bottomRight: 5
            },
            viewSrc: {
                productView: 0,
                playlistView: 1,
                relatedPlayer: 2,
                relatedDeep: 3
            },
            isDeep: {
                'false': 0,
                'true': 1
            },
            auStart: {
                empty: 0,
                'false': 0,
                'true': 1
            },
            adUnit: {
                'false': 0,
                'true': 1
            },
            adSize: {
                '728x90': 0,
                '300x250': 1,
                '468x60': 2,
                '160x600': 3
            },
            adLoc: {
                bottom: 0,
                side: 1
            },
            thSize: {
                large: 0,
                medium: 1,
                small: 2
            },
            txtLoc: {
                bottom: 0,
                side: 1
            },
            fType: {
                category: 0,
                video: 1,
                empty: 2
            },
            sHF: {
                'false': 0,
                'true': 1
            },
            thAlign: {
                horizontal: 0,
                vertical: 1
            },
            header: {
                'false': 0,
                'true': 1
            },
            cbPos: {
                left: 0,
                right: 1,
                bottom: 2,
                top: 3,
                custom: 4
            },
            uNxt: {
                'false': 0,
                'true': 1
            },
            ruNxt: {
                'false': 0,
                'true': 1
            },
            hc: {
                'false': 0,
                'true': 1
            },
            foos: {
                'false': 0,
                'true': 1
            },
            bType: {
                bar: 0,
                tab: 1
            },
            bLoc: {
                left: 0,
                right: 1
            },
            bPos: {
                top: 0,
                middle: 1,
                bottom: 2
            },
            bState: {
                half: 0,
                full: 1
            },
            vFlg: {
                'false': 0,
                'true': 1
            },
            vExp: {
                SID: 0,
                Fivemin: 1,
                Syndication: 2
            },
            vGeo: {
                All: 0,
                US: 2,
                NonUS: 3
            },
            vf: {
                'false': 0,
                'true': 1
            },
            emType: {
                TSDeepSeed: 0,
                BSDeepSeed: 1,
                VideoSection: 2,
                Regular: 3
            },
            proTy: {
	            Embed: 0,
	            ThumbSeed: 1,
	            PlayerSeed: 2,
	            BarSeed: 3
            }
        }
    };
}