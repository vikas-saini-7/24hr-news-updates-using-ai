const { eq, desc, ne, asc, sql } = require("drizzle-orm");
const { db } = require("../lib/db.js");
const { articles, categories, savedArticles } = require("../lib/schema");
const slugify = require("slugify");
const AppError = require("../utils/global-error-handler/AppError.js");

// utils
const { summarizeContent } = require("../utils/ai-based/summarizeContent.js");

exports.getArticlesByCategory = async ({ category, limit = 100, userId }) => {
  let query = db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      imageCover: articles.image_cover,
      sources: articles.sources,
      content: articles.content,
      publishedAt: articles.published_at,
      updatedAt: articles.updated_at,
      category: categories.name,
      isSaved: userId
        ? sql`CASE WHEN ${savedArticles.article_id} IS NOT NULL THEN true ELSE false END`
        : sql`false`,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.category_id, categories.id));

  // Add the savedArticles join when userId is provided
  if (userId) {
    query = query.leftJoin(
      savedArticles,
      eq(savedArticles.article_id, articles.id)
    );
  }

  // apply filter only if category is not "All"
  if (category && category !== "All") {
    query = query.where(eq(categories.name, category));
  }

  const results = await query.orderBy(desc(articles.published_at)).limit(limit);

  return results;
};

const makeSlug = (title) => {
  if (!title || typeof title !== "string") {
    throw new AppError("Title is required and must be a string", 400);
  }

  return slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });
};

const generateUniqueSlug = async (title) => {
  let baseSlug = makeSlug(title);
  let uniqueSlug = baseSlug;
  let counter = 1;

  // Check DB for conflicts
  let exists = await db
    .select({ slug: articles.slug })
    .from(articles)
    .where(eq(articles.slug, uniqueSlug));

  while (exists.length > 0) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;

    exists = await db
      .select({ slug: articles.slug })
      .from(articles)
      .where(eq(articles.slug, uniqueSlug));
  }

  return uniqueSlug;
};

exports.createNewsArticle = async ({
  title,
  imageCover,
  sources,
  content,
  categoryId,
}) => {
  if (!title || !sources || !content || !categoryId) {
    throw new AppError(
      "Missing required fields: title, sources, content, and categoryId are required",
      400
    );
  }

  const slug = await generateUniqueSlug(title);

  let summary;
  if (content) {
    summary = await summarizeContent(content);
  }

  const [newArticle] = await db
    .insert(articles)
    .values({
      title,
      slug,
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

  if (!newArticle) {
    throw new AppError("Failed to create article", 500);
  }

  return newArticle;
};

exports.getNewsArticleById = async ({ articleId, userId }) => {
  if (!articleId) {
    throw new AppError("Article ID is required", 400);
  }

  let query = db
    .select({
      id: articles.id,
      title: articles.title,
      imageCover: articles.image_cover,
      sources: articles.sources,
      content: articles.content,
      publishedAt: articles.published_at,
      updatedAt: articles.updated_at,
      summary: articles.summary,
      category: categories.name,
      isSaved: userId
        ? sql`CASE WHEN ${savedArticles.article_id} IS NOT NULL THEN true ELSE false END`
        : sql`false`,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.category_id, categories.id));

  // Add the savedArticles join when userId is provided
  if (userId) {
    query = query.leftJoin(
      savedArticles,
      eq(savedArticles.article_id, articles.id)
    );
  }

  const [article] = await query.where(eq(articles.id, articleId)).limit(1);

  if (!article) {
    throw new AppError("Article not found", 404);
  }

  return article;
};

exports.getNewsArticleBySlug = async ({ articleSlug, userId }) => {
  if (!articleSlug) {
    throw new AppError("Article slug is required", 400);
  }

  let query = db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      imageCover: articles.image_cover,
      sources: articles.sources,
      content: articles.content,
      publishedAt: articles.published_at,
      updatedAt: articles.updated_at,
      summary: articles.summary,
      category: categories.name,
      isSaved: userId
        ? sql`CASE WHEN ${savedArticles.article_id} IS NOT NULL THEN true ELSE false END`
        : sql`false`,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.category_id, categories.id));

  // Add the savedArticles join when userId is provided
  if (userId) {
    query = query.leftJoin(
      savedArticles,
      eq(savedArticles.article_id, articles.id)
    );
  }

  const [article] = await query.where(eq(articles.slug, articleSlug)).limit(1);

  if (!article) {
    throw new AppError("Article not found", 404);
  }

  return article;
};

exports.deleteNewsArticle = async ({ articleId }) => {
  if (!articleId) {
    throw new AppError("Article ID is required", 400);
  }

  const [deletedArticle] = await db
    .delete(articles)
    .where(eq(articles.id, articleId))
    .returning();

  if (!deletedArticle) {
    throw new AppError("Article not found or already deleted", 404);
  }

  return deletedArticle;
};

exports.getRelatedNewsArticles = async ({ articleId, limit = 3, userId }) => {
  if (!articleId) {
    throw new AppError("Article ID is required", 400);
  }

  const [article] = await db
    .select({ categoryId: articles.category_id })
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  if (!article) {
    throw new AppError("Article not found", 404);
  }

  const categoryId = article.categoryId;

  let query = db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      imageCover: articles.image_cover,
      sources: articles.sources,
      content: articles.content,
      publishedAt: articles.published_at,
      updatedAt: articles.updated_at,
      summary: articles.summary,
      category: categories.name,
      isSaved: userId
        ? sql`CASE WHEN ${savedArticles.article_id} IS NOT NULL THEN true ELSE false END`
        : sql`false`,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.category_id, categories.id));

  // Add the savedArticles join when userId is provided
  if (userId) {
    query = query.leftJoin(
      savedArticles,
      eq(savedArticles.article_id, articles.id)
    );
  }

  const relatedArticles = await query
    .where(eq(articles.category_id, categoryId), ne(articles.id, articleId))
    .orderBy(desc(articles.published_at))
    .limit(limit);

  return relatedArticles;
};

exports.getTopNewsStories = async ({ limit = 20, userId } = {}) => {
  let query = db
    .select({
      id: articles.id,
      slug: articles.slug,
      title: articles.title,
      imageCover: articles.image_cover,
      sources: articles.sources,
      content: articles.content,
      publishedAt: articles.published_at,
      updatedAt: articles.updated_at,
      summary: articles.summary,
      category: categories.name,
      isSaved: userId
        ? sql`CASE WHEN ${savedArticles.article_id} IS NOT NULL THEN true ELSE false END`
        : sql`false`,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.category_id, categories.id));

  // Add the savedArticles join when userId is provided
  if (userId) {
    query = query.leftJoin(
      savedArticles,
      eq(savedArticles.article_id, articles.id)
    );
  }

  const topStories = await query
    .orderBy(desc(articles.published_at))
    .offset(10)
    .limit(limit);

  return topStories;
};
