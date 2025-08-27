const { db } = require("../lib/db.js");
const { savedArticles, articles } = require("../lib/schema.js");
const { eq } = require("drizzle-orm");

exports.saveNewsArticle = async ({ userId, articleId }) => {
  // Insert if not already saved
  const [saved] = await db
    .insert(savedArticles)
    .values({ user_id: userId, article_id: articleId })
    .onConflictDoNothing()
    .returning();

  return saved;
};

exports.unsaveNewsArticle = async ({ userId, articleId }) => {
  const [removed] = await db
    .delete(savedArticles)
    .where(eq(savedArticles.user_id, userId))
    .where(eq(savedArticles.article_id, articleId))
    .returning();

  return removed;
};

exports.getSavedNewsArticles = async ({ userId }) => {
  const saved = await db
    .select({
      id: articles.id,
      title: articles.title,
      imageCover: articles.image_cover,
      summary: articles.summary,
      publishedAt: articles.published_at,
    })
    .from(savedArticles)
    .leftJoin(articles, eq(savedArticles.article_id, articles.id))
    .where(eq(savedArticles.user_id, userId))
    .orderBy(savedArticles.saved_at.desc());

  return saved;
};
