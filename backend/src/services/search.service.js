const { db } = require("../lib/db");
const { articles, categories, savedArticles } = require("../lib/schema");
const { ilike, or, desc, sql } = require("drizzle-orm");
const AppError = require("../utils/global-error-handler/AppError");

exports.searchNewsArticles = async ({ query, userId, limit = 50 }) => {
  if (!query) {
    throw new AppError("Missing search query", 400);
  }

  // Create search pattern for case-insensitive search
  const searchPattern = `%${query}%`;

  let searchQuery = db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      imageCover: articles.image_cover,
      sources: articles.sources,
      content: articles.content,
      summary: articles.summary,
      publishedAt: articles.published_at,
      updatedAt: articles.updated_at,
      category: categories.name,
      isSaved: userId
        ? sql`CASE WHEN ${savedArticles.article_id} IS NOT NULL THEN true ELSE false END`
        : sql`false`,
    })
    .from(articles)
    .leftJoin(categories, sql`${articles.category_id} = ${categories.id}`)
    .where(
      or(
        ilike(articles.title, searchPattern),
        ilike(articles.content, searchPattern),
        ilike(articles.summary, searchPattern)
      )
    );

//   // Add the savedArticles join when userId is provided
//   if (userId) {
//     searchQuery = searchQuery.leftJoin(
//       savedArticles,
//       sql`${savedArticles.article_id} = ${articles.id} AND ${savedArticles.user_id} = ${userId}`
//     );
//   }

  const results = await searchQuery
    .orderBy(desc(articles.published_at))
    .limit(limit);

  return results;
};
