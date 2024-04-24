const fs = require("fs");
module.exports.config = {
	name: "buồn",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "dungkon - Fixed by LTD", 
	description: "chỉ cần nhắn buồn",
	commandCategory: "Noprefix",
	usages: "buồn",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("buồn")==0 ) || (event.body.indexOf("sad")==0 ) || (event.body.indexOf(":(")==0 ) || (event.body.indexOf("")==0 ) ||(event.body.indexOf("Buồn")==0) {
		var msg = {
				body: "Không sao buồn thì đã có tớ bên cạnh cậu nè :3",
				attachment: fs.createReadStream(__dirname + `./../../Data_Vtuan/datajson/vdgai.json`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}