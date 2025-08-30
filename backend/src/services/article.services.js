const { eq, desc } = require("drizzle-orm");
const { db } = require("../lib/db.js");
const { articles, categories } = require("../lib/schema");
const slugify = require("slugify");

// utils
const { summarizeContent } = require("../utils/ai-based/summarizeContent.js");

exports.getArticlesByCategory = async ({ category, limit = 100 }) => {
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
    })
    .from(articles)
    .leftJoin(categories, eq(articles.category_id, categories.id));

  // apply filter only if category is not "All"
  if (category && category !== "All") {
    query = query.where(eq(categories.name, category));
  }

  const results = await query.orderBy(desc(articles.published_at)).limit(limit);

  return results;
};

const makeSlug = (title) =>
  slugify(title, {
    lower: true, // lowercase
    strict: true, // remove special chars
    trim: true,
  });

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
    throw new Error("Missing required fields to create an article");
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
      category: categories.name,
    })
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  return article;
};

exports.getNewsArticleBySlug = async ({ articleSlug }) => {
  console.log("Fetching article by slugsssssssssss:", articleSlug);
  const [article] = await db
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
    })
    .from(articles)
    .leftJoin(categories, eq(articles.category_id, categories.id))
    .where(eq(articles.slug, articleSlug))
    .limit(1);

  console.log("Article fetched by slug:", article);

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
