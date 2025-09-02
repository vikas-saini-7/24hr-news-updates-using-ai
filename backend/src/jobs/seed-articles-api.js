const cron = require("node-cron");
const axios = require("axios");
const slugify = require("slugify");
const { db } = require("../lib/db");
const { articles, categories } = require("../lib/schema");
const { detectCategory } = require("../lib/category");
const { eq } = require("drizzle-orm");
const { appendLogs } = require("../utils/logger");

const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Base endpoint (GNews as example)
const BASE_URL = "https://gnews.io/api/v4/top-headlines";

// Helper to fetch from News API
async function fetchNews(category = "general") {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        token: NEWS_API_KEY,
        category,
        lang: "en",
        country: "in",
        max: 20, // limit
      },
    });

    if (!res.data.articles) return [];
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const articlesList = [];
    for (const item of res.data.articles) {
      const slug = slugify(item.title, { lower: true, strict: true });
      const publishedDate = new Date(item.publishedAt);

      if (publishedDate < twentyFourHoursAgo) {
        continue; // skip older than 24h
      }

      // detect category (your custom function)
      let categoryId = null;
      const catName = detectCategory({
        title: item.title,
        content: item.content || "",
      });

      if (catName) {
        try {
          const catResult = await db
            .select({ id: categories.id })
            .from(categories)
            .where(eq(categories.name, catName))
            .limit(1);

          if (catResult.length > 0) {
            categoryId = catResult[0].id;
          }
        } catch (err) {
          console.error("Category fetch error:", err.message);
        }
      }

      const sourcesArray = [
        {
          name: item.source?.name || "Unknown Source",
          url: item.source?.url || item.url,
        },
      ];

      const article = {
        slug,
        title: item.title,
        image_cover: item.image || null,
        sources: sourcesArray,
        category_id: categoryId,
        content: item.content || item.description || "",
        summary: item.description || null,
        published_at: publishedDate,
      };

      if (article.title && article.content && sourcesArray.length > 0) {
        articlesList.push(article);
      }
    }

    return articlesList;
  } catch (err) {
    console.error("News API fetch error:", err.message);
    return [];
  }
}

async function saveArticles(articlesList) {
  if (!articlesList.length) return;

  try {
    await db
      .insert(articles)
      .values(articlesList)
      .onConflictDoNothing({ target: articles.slug }); // ✅ prevent duplicates

    console.log(`Saved batch of ${articlesList.length} articles.`);

    // To get category names
    const allCategories = await db
      .select({ id: categories.id, name: categories.name })
      .from(categories);
    const categoryMap = new Map(allCategories.map((cat) => [cat.id, cat.name]));

    const logEntries = articlesList.map((a) => ({
      title: a.title,
      category: categoryMap.get(a.category_id) || "Uncategorized",
      time: new Date().toISOString(),
    }));
    appendLogs(logEntries);
  } catch (err) {
    console.error("DB insert error:", err.message);
  }
}
async function runAPIWorker() {
  console.log("🚀 Fetching news...");

  try {
    const newsArticles = await fetchNews("general");
    console.log(`Fetched ${newsArticles.length} fresh articles from API.`);

    await saveArticles(newsArticles);

    console.log("✅ News sync complete.");
  } catch (err) {
    console.error("❌ runAPIWorker failed:", err.message, err.stack);
  }
}

// Run every 15 minutes
cron.schedule("*/15 * * * *", runAPIWorker);

module.exports = { runAPIWorker };
