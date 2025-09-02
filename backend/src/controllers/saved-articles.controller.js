const {
  saveNewsArticle,
  unsaveNewsArticle,
  getSavedNewsArticles,
} = require("../services/saved-articles.service.js");

exports.saveArticle = async (req, res) => {
  try {
    const userId = req.user.id; // from authenticate middleware
    const { articleId } = req.params;

    const saved = await saveNewsArticle({ userId, articleId });

    res.status(201).json({
      success: true,
      message: "Article saved successfully",
      data: saved,
    });
  } catch (err) {
    console.error("error in saving article:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.unsaveArticle = async (req, res) => {
  try {
    const userId = req.user.id;
    const { articleId } = req.params;

    const removed = await unsaveNewsArticle({ userId, articleId });

    res.status(200).json({
      success: true,
      message: "Article unsaved successfully",
      data: removed,
    });
  } catch (err) {
    console.error("error in unsaving article:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSavedArticles = async (req, res) => {
  try {
    const userId = req.user?.id;
    const savedArticles = await getSavedNewsArticles({ userId });

    res.status(200).json({
      success: true,
      message: "Saved articles retrieved successfully",
      data: savedArticles,
    });
  } catch (err) {
    console.error("error in fetching saved articles:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
