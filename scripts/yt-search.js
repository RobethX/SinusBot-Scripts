//Searches for a song on youtube by its name and loads it into the MusicBot
registerPlugin({
    name: "Youtube Song Search",
    version: "1.0",
    description: "Searches for songs on youtube",
    author: "Rob Chiocchio",
    vars: [
        {
            name: "command_trigger",
            title: "Command",
            type: "string",
            placeholder: "play"
        }
    ]
},

function(sinusbot, config) {
    
    var backend = require("backend");
    var engine = require("engine");
    var event = require("event");
    
    if 
