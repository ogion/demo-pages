(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Type = function() { };
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
var vdb = {};
vdb.EventBus = function() {
	this._eventListeners = {}
};
vdb.EventBus.prototype = {
	dispatchEvent: function(event,arg1) {
		console.log("[DEBUG] EVENT_BUS: fire " + event);
		
        var args = Array.prototype.slice.call(arguments, 1);
        var listeners = this._eventListeners[event];
        if (listeners) {
            for (var j = 0, length = listeners.length; j < length; j++) {
                this._notifyListener(event, args, listeners[j]);
            }
        }
	}
	,addEventListener: function(event,listener) {
		console.log("[DEBUG] EVENT_BUS: listen " + event);
		
        var listeners = this._eventListeners[event];
        if (!listeners) {
            this._eventListeners[event] = listeners = [];
        }
        listeners.push(listener);
	}
	,removeEventListener: function(event,listener) {
		
        var listeners = this._eventListeners[event] || [];
        for (var i = 0; i < listeners.length; i++) {
            if (listeners[i] == listener) {
                listeners.splice(i, 1);
                i--;
            }
        }
	}
	,_notifyListener: function(event,args,listener) {
		
        try {
            listener.apply({}, args);
        } catch (error) {
            console.log("[ERROR] EventBus:", error, {"type": event, "args": args});
        }
	}
};
vdb.utils = {};
vdb.utils.JSAdapter = function(meat) {
	this._meat = meat;
};
vdb.external = {};
vdb.external.brightcove = {};
vdb.external.brightcove.BrightCovePlayer = function(meat) {
	vdb.utils.JSAdapter.call(this,meat);
};
vdb.external.brightcove.BrightCovePlayer.__super__ = vdb.utils.JSAdapter;
vdb.external.brightcove.BrightCovePlayer.prototype = $extend(vdb.utils.JSAdapter.prototype,{
	addEventListener: function(name,listener) {
		this._meat["addEventListener"](name, listener);
	}
});
vdb.external.brightcove.BrightcoveAPI = function(meat,experienceID) {
	this.events = null;
	this.player = null;
	vdb.utils.JSAdapter.call(this,meat);
	this._experienceId = experienceID;
};
vdb.external.brightcove.BrightcoveAPI.__super__ = vdb.utils.JSAdapter;
vdb.external.brightcove.BrightcoveAPI.prototype = $extend(vdb.utils.JSAdapter.prototype,{
	get_player: function() {
		if(this.player == null) this.player = new vdb.external.brightcove.BrightCovePlayer(this._meat["getExperience"](this._experienceID));
		return this.player;
	}
	,get_events: function() {
		if(this.events == null) this.events = new vdb.external.brightcove.events.BrightCoveEvents(this._meat["events"]);
		return this.events;
	}
});
vdb.external.brightcove.events = {};
vdb.external.brightcove.events.BrightCoveEvents = function(meat) {
	this.mediaEvent = null;
	vdb.utils.JSAdapter.call(this,meat);
};
vdb.external.brightcove.events.BrightCoveEvents.__super__ = vdb.utils.JSAdapter;
vdb.external.brightcove.events.BrightCoveEvents.prototype = $extend(vdb.utils.JSAdapter.prototype,{
	get_mediaEvent: function() {
		if(this.mediaEvent == null) this.mediaEvent = new vdb.external.brightcove.events.MediaEvent(this._meat["MediaEvent"]);
		return this.mediaEvent;
	}
});
vdb.external.brightcove.events.MediaEvent = function(meat) {
	this.STOP = null;
	this.SEEK_NOTIFY = null;
	this.PROGRESS = null;
	this.PLAY = null;
	this.ERROR = null;
	this.COMPLETE = null;
	this.CHANGE = null;
	this.BEGIN = null;
	vdb.utils.JSAdapter.call(this,meat);
};
vdb.external.brightcove.events.MediaEvent.__super__ = vdb.utils.JSAdapter;
vdb.external.brightcove.events.MediaEvent.prototype = $extend(vdb.utils.JSAdapter.prototype,{
	get_BEGIN: function() {
		return this._meat["BEGIN"];
	}
	,get_CHANGE: function() {
		return this._meat["CHANGE"];
	}
	,get_COMPLETE: function() {
		return this._meat["COMPLETE"];
	}
	,get_ERROR: function() {
		return this._meat["ERROR"];
	}
	,get_PLAY: function() {
		return this._meat["PLAY"];
	}
	,get_PROGRESS: function() {
		return this._meat["PROGRESS"];
	}
	,get_SEEK_NOTIFY: function() {
		return this._meat["SEEK_NOTIFY"];
	}
	,get_STOP: function() {
		return this._meat["STOP"];
	}
});
vdb.extras = {};
vdb.extras.Extra = function() {
	vdb.EventBus.call(this);
};
vdb.extras.Extra.register = function(classRef,schema) {
	var instance = Type.createInstance(classRef,[]);
	if(schema == null) schema = "empty";
	instance.exportSchema("${cdn.url}js/extras/schemas/" + ("" + schema + ".xml"));
	vidible['registerExtra'](instance);;
};
vdb.extras.Extra.main = function() {
	vdb.extras.Extra.register(vdb.extras.Extra);
};
vdb.extras.Extra.__super__ = vdb.EventBus;
vdb.extras.Extra.prototype = $extend(vdb.EventBus.prototype,{
	exportSchema: function(url) {
		this['getSchema'] = function () {
            return url;
        }
		return url;
	}
	,getConfigProperty: function(property) {
		return this._config[property];;
	}
	,onPlayerReady: function(f) {
		var _g = this;
		if(this._controller.getVideo(0) == null) {
			var onMetadata;
			var onMetadata1 = null;
			onMetadata1 = function(e) {
				_g._player.removeEventListener(window.vdb.constants.events.Player.VIDEO_META,onMetadata1);
				f();
			};
			onMetadata = onMetadata1;
			this._player.addEventListener(window.vdb.constants.events.Player.VIDEO_META,onMetadata);
		} else f();
	}
	,getSchemaProperty: function(property) {
		return this._config['config'] && this._config['config'][property];
	}
	,initExtra: function(config,playerController) {
		this._config = config;
		this._controller = playerController;
		this._player = this._controller.getPlayer();
		this._context = window.vdb.ctx;
		this.onPlayerReady($bind(this,this.runExtra));
	}
	,runExtra: function() {
		this._region = window.vdb.util.Region.parse(this.getConfigProperty("region"));
	}
	,isBlocking: function() {
		return this._config["blocking"];
	}
	,unblock: function() {
		if(this.isBlocking()) this.dispatchEvent(window.vdb.events.PlayerModuleEvent.UNBLOCK);
	}
});
vdb.extras.BrightCoveModule = function() {
	vdb.extras.Extra.call(this);
};
vdb.extras.BrightCoveModule.main = function() {
	new vdb.extras.BrightCoveModule().runExtra();
};
vdb.extras.BrightCoveModule.__super__ = vdb.extras.Extra;
vdb.extras.BrightCoveModule.prototype = $extend(vdb.extras.Extra.prototype,{
	runExtra: function() {
		window["VdbBC"] = {}
		window["VdbBC"]["onTemplateReady"] = this.ready;
	}
	,ready: function(event) {
		console.log("onTemplateReady");
		this._api = new vdb.external.brightcove.BrightcoveAPI(window["brightcove"]["api"],event["target"]["experience"]["id"]);
		this._api.get_player().addEventListener(this._api.get_events().get_mediaEvent().get_BEGIN(),$bind(this,this.onVideoBegin));
		this._api.get_player().addEventListener(this._api.get_events().get_mediaEvent().get_PROGRESS(),$bind(this,this.onVideoProgress));
	}
	,onVideoBegin: function(event) {
		console.log("Video begins.");
	}
	,onVideoProgress: function(event) {
		console.log("Video progress.");
	}
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
vdb.extras.BrightCoveModule.main();
})();
