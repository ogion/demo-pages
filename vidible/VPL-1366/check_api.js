function check_api() {
  function (msg) {
    var logger = $("#log");
    var html = logger.html();
    html += msg + "<br/>";
    logger.html(html);
  }

  function playerMetaData (evt) {
    log("We got event: " + JSON.stringify(evt));
  }

  function onPlayerReady(player) {
    log("onPlayerReady");
    player.addEventListener(vidible.VIDEO_START, playerMetaData);
    player.addEventListener(vidible.VIDEO_END, playerMetaData);
    player.addEventListener(vidible.VIDEO_TIMEUPDATE, playerMetaData);
    player.addEventListener(vidible.VIDEO_META, playerMetaData);
  }

  function startCheck() {
    (function(div, cb){
      if (div.vdb_Player) {
        cb(div.vdb_Player);
      } else {
        var fn = arguments.callee;
        setTimeout(function(){ fn(div,cb); },0);
      }
    })(document.getElementById("vidible_player"), onPlayerReady);
  }

  log("Start Check");
  startCheck();
}
check_api();
