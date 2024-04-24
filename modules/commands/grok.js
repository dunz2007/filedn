module.exports.config = {
 name: "grok",
 hasPermission: 0,
 credits: "YenzyJS",
 commandCategory: "Tiện ích",
 description: "Interact with GROK AI",
 usePrefix: false,
 usages: "[your message]",
 cooldowns: 2
};

exports.run = async ({ api, event, args }) => {
 if (!args.length) {
 return api.sendMessage("Please provide a message to send to Arched AI", event.threadID);
 }

 const axios = require('axios');
 const target = args.join(" ");
 const apiUrl = `http://lianeapi.onrender.com/ask/grok?key=auth-v617a&question=${encodeURIComponent(target)}`;

 try {
 const response = await axios.get(apiUrl);
 const responseData = response.data;

 if (responseData && responseData.message) {
 api.sendMessage(responseData.message, event.threadID);
 } else {
 api.sendMessage("🔭 | Unexpected response from GROK API", event.threadID);
 }
 } catch (error) {
 api.sendMessage("API ERROR: Unable to communicate with Arched API. Please contact the developer of this API", event.threadID);
 }
};