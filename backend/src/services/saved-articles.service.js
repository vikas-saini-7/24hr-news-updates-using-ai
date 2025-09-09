const { db } = require("../lib/db.js");
const { savedArticles, articles } = require("../lib/schema.js");
const { eq, desc, sql, and } = require("drizzle-orm");

const AppError = require("../utils/global-error-handler/AppError.js");

exports.saveNewsArticle = async ({ userId, articleId }) => {
  if (!userId || !articleId) {
    throw new AppError("User ID and Article ID are required", 400);
  }

  // Check if article exists
  const [articleExists] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  if (!articleExists) {
    throw new AppError("Article not found", 404);
  }

  // Insert if not already saved
  const [saved] = await db
    .insert(savedArticles)
    .values({ user_id: userId, article_id: articleId })
    .onConflictDoNothing()
    .returning();

  // If nothing was returned, it means it was already saved
  if (!saved) {
    throw new AppError("Article is already saved", 409);
  }

  return saved;
};

exports.unsaveNewsArticle = async ({ userId, articleId }) => {
  if (!userId || !articleId) {
    throw new AppError("User ID and Article ID are required", 400);
  }

  const [removed] = await db
    .delete(savedArticles)
    .where(
      and(
        eq(savedArticles.user_id, userId),
        eq(savedArticles.article_id, articleId)
      )
    )
    .returning();

  if (!removed) {
    throw new AppError("Saved article not found", 404);
  }

  return removed;
};

exports.getSavedNewsArticles = async ({ userId }) => {
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  const saved = await db
    .select({
      slug: articles.slug,
      id: articles.id,
      title: articles.title,
      imageCover: articles.image_cover,
      summary: articles.summary,
      publishedAt: articles.published_at,
      isSaved: sql`true`,
    })
    .from(savedArticles)
    .leftJoin(articles, eq(savedArticles.article_id, articles.id))
    .where(eq(savedArticles.user_id, userId))
    .orderBy(desc(savedArticles.saved_at));

  return saved;
};
