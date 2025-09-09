const {
  DefaultSummary,
  ChatGPTSummary,
  ClaudeSummary,
  GeminiSummary,
  GrokSummary,
} = require("../utils/ai-based/summarize-with-ai");

const AppError = require("../utils/global-error-handler/AppError");

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
      throw new AppError("Please Select a valid model", 400);
  }

  return summary;
};

exports.getNewsSummary = async ({ model }) => {
  if (!model) {
    throw new AppError("Model is required", 400);
  }

  const summary = generateSummaryUsingModel(model);

  return summary;
};
