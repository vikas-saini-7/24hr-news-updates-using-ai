// utils/purgeOldArticles.js
const { articles } = require("../../lib/schema");
const { lt } = require("drizzle-orm");
const { db } = require("../../lib/db");

async function purgeOldArticles() {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hrs ago

  await db.delete(articles).where(lt(articles.published_at, cutoff));

  console.log(`🗑️ Purged articles older than ${cutoff.toISOString()}`);
}

module.exports = { purgeOldArticles };
