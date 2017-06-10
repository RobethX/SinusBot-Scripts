//Searches for a song on youtube by its name and loads it into the MusicBot
registerPlugin({
	name: "Youtube Song Search",
	version: "1.0",
	description: "Searches for songs on youtube",
	author: "Rob Chiocchio",
	vars: [
		{
			name: "commandTrigger",
			title: "Command",
			type: "string",
			placeholder: "!song"
		},{
			name: "searchURL",
			title: "Search URL",
			type: "string",
			placeholder: "https://www.youtube.com/results?search_query="
		},{
			name: 'serverChatEnabled',
			title: 'Listen in the serverchat',
			type: 'checkbox'
		},{
			name: 'channelChatEnabled',
			title: 'Listen in the channel chat',
			type: 'checkbox'
		},{
			name: 'privateChatEnabled',
			title: 'Listen in the private chat',
			type: 'checkbox'
		}
	]
}, function(sinusbot, config) {

	var backend = require("backend");
	var engine = require("engine");
	var event = require("event");
	var media = require("media");
	
	//var commandRegex = new RegExp(/^!song(?: \w*?)??$/i); //allow custom commands
	var commandRegex = new RegExp(/([^\s]+)*/i);
	var messageRegex = new RegExp(/\s(.*)$/i);
	
	config.commandTrigger = config.commandTrigger || "!song";
	config.privateChatEnabled = config.privateChatEnabled || true;
	config.channelChatEnabled = config.channelChatEnabled || true;
	config.serverChatEnabled = config.serverChatEnabled || false;
	engine.saveConfig(config);

	event.on("chat", function (ev) {
		var client = ev.client;
		var channel = ev.channel;
		
		if (client.isSelf()) return;
		
		//engine.log("chat event: " + ev.text + ", " + ev.client.name() + ", " + ev.mode);
		
		if (ev.mode == 1 && config.privateChatEnabled ||
            ev.mode == 2 && config.channelChatEnabled ||
            ev.mode == 3 && config.serverChatEnabled) {
				
			engine.log("chat event: " + ev.text + ", " + ev.client.name() + ", " + ev.mode);
			
			var commandMatch = String(ev.text).match(commandRegex);
			var messageMatch = String(ev.text).match(messageRegex);
			var songQuery = messageMatch[1];
			
			engine.log(commandMatch);
			engine.log(messageMatch);

			if (commandMatch[1] == config.commandTrigger) {
				engine.log("got command from " + ev.client.name());
				ev.client.chat("Attempting to queue requested song " + songQuery);
				var request = encodeURI(songQuery);
				var url = config.searchURL + request;
				engine.log(url);
				media.yt(url);
				return;
			}
		}
	});
});