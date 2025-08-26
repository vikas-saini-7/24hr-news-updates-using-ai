const summarizeContent = async (content) => {
  // Dummy implementation for summarization
  if (content.length <= 100) {
    return content;
  }
  //   later generate with ai
  return content.substring(0, 100) + "...";
};
module.exports = { summarizeContent };
