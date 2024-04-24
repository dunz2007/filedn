const axios = require("axios");
const fs = require("fs");
module.exports.config = {
	name: "capwall",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Truong05",
	description: "Cap wall Facebook",
	commandCategory: "Hệ thống",
    cooldowns: 5
}
module.exports.run = async ({ api, event, Threads, args, Users }) => {
  try{
    const moment = require("moment-timezone");
    const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
    let name = await Users.getNameUser(event.senderID);
    let mentions = [{
      tag: name,
      id: event.senderID
    }];
    api.sendMessage({body: `→ 𝗖𝗵𝗼̛̀ 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽\n⏳ 𝗖𝗮𝗽 𝘃𝗮̀𝗼 𝗹𝘂́𝗰: ${tpkk}\n💮 𝘃𝗼̛́𝗶 𝗹𝗮̣𝗶 𝘁𝘂̀𝘆 𝘁𝗵𝗲𝗼 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝗼𝘁 𝗺𝗼̛́𝗶 𝗰𝗮𝗽 đ𝘂̛𝗼̛̣𝗰 𝗻𝗵𝗮`, mentions}, event.threadID, event.messageID);
    let uid;
    if (event.type == "message_reply") {
      uid = event.messageReply.senderID;
    } else if (Object.keys(event.mentions).length == 1) {
      uid = Object.keys(event.mentions)[0];
    } else {
      uid = event.senderID;
    }
    const validItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    let cookie = global.cookie;
    cookie.split(';').forEach(item => {
        let data = item.trim().split('=');
        if (validItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    const url = encodeURI(`https://www.api.dongdev.site/capwall/${uid}/${cookie}`);
    const path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=f2aa93&url=${url}&dimension=1920x1080`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `🎥 ==== [ 𝗖𝗔𝗣 𝗪𝗔𝗟𝗟 ] ==== 🎥\n━━━━━━━━━━━━━━━━\n🌸 𝗮̂𝘆 𝗱𝗼̂ 𝗯𝗼𝘁 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝗿𝗼̂̀𝗶 𝗻𝗲̀ ${name}\n⏰ 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${tpkk}\n━━━━━━━━━━━━━━━━━━\n💓 𝗕𝗮̣𝗻 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗰𝗮𝗽 𝗿𝗼̂̀𝗶 𝗥𝗲𝗽𝗹𝘆 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗺𝘂𝗼̂́𝗻 𝗰𝗮𝗽
⚙️ 𝗗𝘂̀𝗻𝗴 !𝗰𝗮𝗽 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗻𝗵𝗶𝗲̂̀𝘂 𝗹𝗼𝗮̣𝗶 𝗰𝗮𝗽\n━━━━━━━━━━━━━━━━━━\n→ 𝘁𝗶́𝗻𝗵 𝗻𝗮̆𝗻𝗴 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝗰𝗮𝗽 𝘄𝗮𝗹𝗹 𝗸𝗵𝗶 𝗽𝗵𝗮́𝘁 𝗵𝗶𝗲̣̂𝗻 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝗮𝗽`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
  } catch(e){
    console.log(e);
  }
}
