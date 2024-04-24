const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "sendnoti",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "TruongMini",
    description: "",
    commandCategory: "Admin",
    usages: "[msg]",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `👤 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝘂𝘀𝗲𝗿 ${name}\n💬 𝗩𝗼̛́𝗶 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 : ${body}\n🏠 𝗡𝗵𝗼́𝗺 : ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `👤 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝘂𝘀𝗲𝗿 ${name}\n💬 𝗩𝗼̛́𝗶 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 : ${body}\n🏠 𝗡𝗵𝗼́𝗺 ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `👤 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗮𝗱𝗺𝗶𝗻 ${name}\n💬 𝗩𝗼̛́𝗶 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 : ${body}\n💌 𝗥𝗲𝗽 đ𝗲̂̉ 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶 𝗮𝗱𝗺𝗶𝗻`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `👤𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗮𝗱𝗺𝗶𝗻 ${name}\n 💬 𝗩𝗼̛́𝗶 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 : ${body}\n💌 𝗥𝗲𝗽 đ𝗲̂̉ 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶 𝗮𝗱𝗺𝗶𝗻`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `👤 𝗧𝗵𝗼̂𝗻𝗴 𝗯𝗮́𝗼 𝘁𝘂̛̀ ${await Users.getNameUser(senderID)}\n💬 𝗩𝗼̛́𝗶 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 : ${args.join(" ")}\n💌 𝗥𝗲𝗽 đ𝗲̂̉ 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶 𝗮𝗱𝗺𝗶𝗻`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `👤 𝗧𝗵𝗼̂𝗻𝗴 𝗯𝗮́𝗼 𝘁𝘂̛̀ ${await Users.getNameUser(senderID)}\n💬 𝗩𝗼̛́𝗶 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 : ${args.join(" ")}\n💌 𝗥𝗲𝗽 đ𝗲̂̉ 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶 𝗮𝗱𝗺𝗶𝗻`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "sendnoti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`Send to ${can} thread, not send to ${canNot} thread`, threadID);
                      }
