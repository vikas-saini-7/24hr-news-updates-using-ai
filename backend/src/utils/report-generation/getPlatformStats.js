const { db } = require("../../lib/db");
const {
  users,
  articles,
  categories,
  savedArticles,
} = require("../../lib/schema");
const { count } = require("drizzle-orm");

async function getPlatformStats() {
  const totalUsers = await db.select({ value: count() }).from(users);
  const totalArticles = await db.select({ value: count() }).from(articles);
  const totalCategories = await db.select({ value: count() }).from(categories);
  const totalSaved = await db.select({ value: count() }).from(savedArticles);

  return {
    users: totalUsers[0].value,
    articles: totalArticles[0].value,
    categories: totalCategories[0].value,
    savedArticles: totalSaved[0].value,
  };
}

module.exports = { getPlatformStats };
