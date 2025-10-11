// services/llm.service.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.streamNewsSummaryFromWeb = async (userQuery, length, res) => {
  try {
    // Choose model based on length parameter
    const modelName =
      length === "medium" ? "gemini-2.5-flash" : "gemini-2.5-flash-lite";

    const model = genAI.getGenerativeModel({
      model: modelName, // Supports live web search + streaming
      // tools: [{ name: "web" }],
    });

    const lengthInstruction =
      length === "medium"
        ? "Provide a detailed summary with context and analysis."
        : "Provide a brief, concise summary focusing on key points only.";

    const prompt = `
        You are a factual, concise news summarization assistant.
        Search the **current web** for important verified events **from the last 24 hours only**.
        Ignore older or speculative reports.
        ${lengthInstruction}
        Topic: "${userQuery}"
        `;

    // Start streaming
    const stream = await model.generateContentStream(prompt);

    // Set headers for streaming
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    // Stream data chunks as they arrive
    for await (const chunk of stream.stream) {
      const text = chunk.text();
      if (text) res.write(text);
    }

    res.end();
  } catch (err) {
    console.error("Error in streaming summary:", err);
    if (!res.headersSent) {
      res.status(500).send("Error streaming news summary");
    } else {
      res.end();
    }
  }
};
