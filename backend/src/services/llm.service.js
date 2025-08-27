const {
  DefaultSummary,
  ChatGPTSummary,
  ClaudeSummary,
  GeminiSummary,
  GrokSummary,
} = require("../utils/ai-based/summarize-with-ai");

const generateSummaryUsingModel = (model) => {
  let summary;
  switch (model) {
    case "default":
      summary = DefaultSummary();
      break;
    case "chatgpt":
      summary = ChatGPTSummary();
      break;
    case "claude":
      summary = ClaudeSummary();
      break;
    case "gemini":
      summary = GeminiSummary();
      break;
    case "grok":
      summary = GrokSummary();
      break;
    default:
      throw new Error("Please Select a valid model");
  }

  return summary;
};

exports.getNewsSummary = async ({ model }) => {
  const summary = generateSummaryUsingModel(model);

  return summary;
};
