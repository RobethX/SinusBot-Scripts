//Scrobbles playing songs to last.fm
registerPlugin({
	name: "Last.fm Scrobbler",
	version: "1.0",
	description: "Scrobbles playing songs to last.fm",
	author: "Rob Chiocchio",
	vars: [
		{
			name: "apiKey",
			title: "Last.fm API key",
			type: "string",
			placeholder: "xxxxxxxxxxxx"
		},{
			name: "getUrl",
			title: "Last.fm API GET URL",
			type: "string",
			placeholder: "http://www.last.fm/api/auth/?api_key="
		}
	]
}, function httpGet(config.getUrl + config.apiKey) {

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("get", config.getUrl + config.apiKey, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;

}, function(sinusbot, config) {

	var backend = require("backend");
	var engine = require("engine");
	var event = require("event");
	var media = require("media");
	var track = require("track");
	
	config.apiKey = config.apiKey || "xxxxxxxxxxxx";
	engine.saveConfig(config);

	event.on("track", function (ev) {
		var title = track.title;
		var artist = track.artist;
		var album = track.album;


	});
	
	event.on("trackEnd", function (ev) {

	});
});