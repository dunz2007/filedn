 module.exports.config = {
  name: "tag",
  version: "1.0.0",
  hasPermssion: 3,
  credits: "",
  description: "",
  commandCategory: "Hệ thống",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "1162050272") {
    var aid = ["1162050272"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["không nên làm phiền Gấu hãy chờ phản hồi!"," Dùng /callad + nội dung cần gửi! ","Anh cũng yêu em <3"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
}