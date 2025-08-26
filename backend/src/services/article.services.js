const { eq, desc } = require("drizzle-orm");
const { db } = require("../lib/db.js");
const { articles, categories } = require("../lib/schema");

// utils
const { summarizeContent } = require("../utils/ai-based/summarizeContent.js");

exports.getArticlesByCategory = async ({ category, limit = 10 }) => {
  const results = await db
    .select({
      id: articles.id,
      title: articles.title,
      imageCover: articles.image_cover,
      sources: articles.sources,
      content: articles.content,
      publishedAt: articles.published_at,
      updatedAt: articles.updated_at,
      categoryName: categories.name,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.category_id, categories.id))
    .where(eq(categories.name, category))
    .orderBy(desc(articles.published_at))
    .limit(limit);

  return results;
};

exports.createNewsArticle = async ({
  title,
  imageCover,
  sources,
  content,
  categoryId,
}) => {
  if (!title || !sources || !content || !categoryId) {
    throw new Error("Missing required fields to create an article");
  }

  let summary;
  if (content) {
    summary = await summarizeContent(content);
  }

  const [newArticle] = await db
    .insert(articles)
    .values({
      title,
      image_cover:
        imageCover ||
        "https://i.pinimg.com/736x/ae/06/54/ae0654dfb0d0157d6c8c6c25063d0a19.jpg",
      sources,
      content,
      category_id: categoryId,
      published_at: new Date(),
      summary,
    })
    .returning();

  return newArticle;
};

exports.getNewsArticleById = async ({ articleId }) => {
  const [article] = await db
    .select({
      id: articles.id,
      title: articles.title,
      imageCover: articles.image_cover,
      sources: articles.sources,
      content: articles.content,
      publishedAt: articles.published_at,
      updatedAt: articles.updated_at,
      summary: articles.summary,
      categoryName: categories.name,
    })
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  return article;
};

exports.deleteNewsArticle = async ({ articleId }) => {
  const [deletedArticle] = await db
    .delete(articles)
    .where(eq(articles.id, articleId))
    .returning();

  return deletedArticle;
};

exports.getRelatedNewsArticles = async ({ articleId, limit = 3 }) => {
  const [article] = await db
    .select({ categoryId: articles.category_id })
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  if (!article) {
    throw new Error("Article not found");
  }

  const categoryId = article.categoryId;

  const relatedArticles = await db
    .select({
      id: articles.id,
      title: articles.title,
      imageCover: articles.image_cover,
      sources: articles.sources,
      content: articles.content,
      publishedAt: articles.published_at,
      updatedAt: articles.updated_at,
      summary: articles.summary,
    })
    .from(articles)
    .where(
      eq(articles.category_id, categoryId),
      articles.id.ne(articleId) // Excludiing the original article
    )
    .orderBy(desc(articles.published_at))
    .limit(limit);

  return relatedArticles;
};
