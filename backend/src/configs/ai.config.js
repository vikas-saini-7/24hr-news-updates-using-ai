// config/aiClients.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const hfClient = axios.create({
  baseURL: "https://api-inference.huggingface.co/models",
  headers: {
    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
  },
});

module.exports = { genAI, hfClient };
