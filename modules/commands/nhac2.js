module.exports.config = {
	name: "nhạc",
	version: "1.0.1",
	hasPermssion: 1,
	credits: "",
	description: "random nhạc, chỉ cần nhắn hát đi ",
	commandCategory: "Media",
	usages: "",
	cooldowns: 0,
	denpendencies: {
		"fs-extra": "",
		"request": ""
	}
};

module.exports.handleEvent = async ({
	event,
	api,
	Users
}) => {
	const fs = global.nodemodule["fs-extra"];
	var {
		threadID,
		messageID,
		body,
		senderID
	} = event;
	const thread = global.data.threadData.get(threadID) || {};
	if (typeof thread["nhạc2"] !== "undefined" && thread["nhạc2"] == false) return;

	let name = await Users.getNameUser(event.senderID);
	if (senderID == api.getCurrentUserID()) return;

	function out(data) {
		api.sendMessage(data, threadID, messageID)
	}
	//trả lời
	var msg = {
		body: `Em không biết hát nhưng em có thể tìm nhạc có sẵn trong dự án\nChúc các bạn nghe nhạc vui vẻ`,
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://endurable-ambiguous-corleggy.glitch.me/vdcosplayv2')).data.data,
			method: "GET",
			responseType: "stream"
		})).res.data
	}
	// Gọi bot
	var arr = ["hát đi bot","bot hát đi"," hát đi tui nghe","hát t nghe"," hát đi"];
	arr.forEach(i => {
		let str = i[0].toUpperCase() + i.slice(1);
		if (body === i.toUpperCase() | body === i | str === body) return out(msg)
	});
};

module.exports.languages = {
	"vi": {
		"on": "Bật",
		"off": "Tắt",
		"successText": "done",
	}
}

module.exports.run = async function({
	api,
	event,
	Threads,
	getText
}) {
	const {
		threadID,
		messageID
	} = event;
	let data = (await Threads.getData(threadID)).data;

	if (typeof data["nhạc2"] == "undefined" || data["nhạc2"] == true) data["nhạc2"] = false;
	else data["nhạc2"] = true;

	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["nhạc2"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}