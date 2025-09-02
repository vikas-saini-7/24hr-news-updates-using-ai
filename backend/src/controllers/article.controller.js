const {
  getArticlesByCategory,
  createNewsArticle,
  getNewsArticleById,
  deleteNewsArticle,
  getRelatedNewsArticles,
  getNewsArticleBySlug,
} = require("../services/article.services.js");

exports.getAllArticlesByCategory = async (req, res) => {
  try {
    const { category, limit } = req.query;
    const articles = await getArticlesByCategory({ category, limit });

    res.status(200).json({
      success: true,
      message: "Articles retrieved successfully",
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const { title, imageCover, sources, content, categoryId } = req.body;
    const article = await createNewsArticle({
      title,
      imageCover,
      sources,
      content,
      categoryId,
    });

    res.status(201).json({
      success: true,
      message: "Article created successfully",
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await getNewsArticleById({ articleId });

    res.status(200).json({
      success: true,
      message: "Article retrieved successfully",
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getArticleBySlug = async (req, res) => {
  try {
    const articleSlug = req.params.slug;
    const article = await getNewsArticleBySlug({ articleSlug });

    // console.log("Article retrieved by slug:", article);

    res.status(200).json({
      success: true,
      message: "Article retrieved successfully",
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const articleId = req.params;
    const deleted = await deleteNewsArticle({ articleId });

    res.status(200).json({
      success: true,
      message: "Article deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRelatedArticles = async (req, res) => {
  try {
    const articleId = req.params.id;
    const relatedArticles = await getRelatedNewsArticles({
      articleId,
      limit,
    });

    res.status(200).json({
      success: true,
      message: "Related articles retrieved successfully",
      data: relatedArticles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
