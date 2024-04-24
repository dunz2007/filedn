const axios = require("axios");
module.exports.config = {
    name: "randomvdgai",
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
  const res = await axios.get('http://vanthuan.name.vn/video/videogai');
  const data = res.data.data;
  let download = (await axios.get(data, {
      responseType: "stream"
    })).data;
 let KEY = ["rdgai", "random gái", "randomgai"];
  if (KEY.includes(event.body.toLowerCase()) !== false) {
       let name = await Users.getNameUser(event.senderID)
       let msg = {body: ``, attachment: download}
        return api.sendMessage(msg, event.threadID, event.messageID);}
     };
module.exports.run = async ({ event, api }) => {
return api.sendMessage("𝐃𝐮̀𝐧𝐠 𝐬𝐚𝐢 𝐜𝐚́𝐜𝐡 𝐫𝐨̂̀𝐢 𝐥𝐞̂𝐮 𝐥𝐞̂𝐮",event.threadID)
}