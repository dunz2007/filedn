const { read } = require("fs");
module.exports.config = {
	name: "uid",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Mirai Team mod reply by vinh cư tê",
	description: "Lấy ID người dùng.",
	commandCategory: "Tiện ích",
	cooldowns: 5
};

module.exports.run = async function ({ api, event, Users }) 
{ 
  
  if 
   (event.type == "message_reply") {
   var uid = (event.messageReply.senderID);
api.sendMessage(`${uid}\n\n𝐋𝐢𝐧𝐤 m.me/${uid}`, event.threadID, event.messageID);
   return; 
   }
  else {
   if (Object.keys(event.mentions) == 0) return api.sendMessage(`${event.senderID}`, event.threadID, event.messageID);
  else {
    for (var i = 0; i < Object.keys(event.mentions).length; i++) api.sendMessage(`${Object.values(event.mentions)[i].replace('@', '')}: ${Object.keys(event.mentions)[i]}`, event.threadID);
    return;
  }
  }
}