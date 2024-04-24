const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermission: 0,
  credits: "tnt",
  description: "chatgpt",
  commandCategory: "ChatGPT",
  usages: "ai",
  cooldowns: 0,
};

let lastQuery = "";

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (!args[0]) {
    api.sendMessage("Vui lòng cung cấp câu hỏi để tìm kiếm", threadID, messageID);
    return;
  }

  const query = args.join(" ");

  if (query === lastQuery) {
    api.sendMessage("Đã trả lời câu hỏi trước đó", threadID, messageID);
    return;
  } else {
    lastQuery = query;
  }

  api.sendMessage("Đang trả lời...", threadID, messageID);

  const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/chatgpt',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '843052fc5cmsh208d39312244a7dp186c7fjsn9a3bd5296dbd',
      'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: query
        }
      ],
      web_access: false
    }
  };

  try {
    const response = await axios.request(options);
    if (response.status === 200 && response.data && response.data.result) {
      const botResponse = response.data.result;
      api.sendMessage(`${botResponse}`, threadID, messageID);
    } else {
      api.sendMessage("Xin lỗi, không tìm thấy câu trả lời phù hợp", threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("Đã xảy ra lỗi khi truy xuất câu trả lời", threadID, messageID);
  }
};
