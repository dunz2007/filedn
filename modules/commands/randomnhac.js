const axios = require("axios");
module.exports.config = {
    name: "Nhạc",
    version: "1.1.0",
    hasPermssion: 1,
    credits: "Gấu đẹp trai ",
    description: "noprefix",
    commandCategory: "Noprefix",
    usages: "",
    cooldowns: 0,
    denpendencies: {
        "axios": "",
        "moment-timezone": ""
    }
}

module.exports.handleEvent = async ({ event, api,Users }) => {
  const res = await axios.get('https://vanthuan.name.vn/api/nhac.php');
  const data = res.data.data;
  let download = (await axios.get(data, {
      responseType: "stream"
    })).data;
 let KEY = ["sing", "music", "nhạc"];
  if (KEY.includes(event.body.toLowerCase()) !== false) {
       let name = await Users.getNameUser(event.senderID)
       let msg = {body: ` nhạc của bạn đây`, attachment: download}
        return api.sendMessage(msg, event.threadID, event.messageID);}
     };
module.exports.run = async ({ event, api }) => {
return api.sendMessage("𝐃𝐮̀𝐧𝐠 𝐬𝐚𝐢 𝐜𝐚́𝐜𝐡 𝐫𝐨̂̀𝐢 𝐥𝐞̂𝐮 𝐥𝐞̂𝐮",event.threadID)
}