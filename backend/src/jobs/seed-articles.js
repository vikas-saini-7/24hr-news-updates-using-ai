const cron = require("node-cron");
const axios = require("axios");
const Parser = require("rss-parser");
const slugify = require("slugify");
const { db } = require("../lib/db");
const { articles } = require("../lib/schema");
const { detectCategory } = require("../lib/category");
const { sql } = require("drizzle-orm");

const parser = new Parser();

// 📰 RSS Feeds
const RSS_FEEDS = [
  "https://www.thehindu.com/feeder/default.rss",
  "https://feeds.feedburner.com/ndtvnews-top-stories",
];

// 🔑 NewsData.io API
const NEWSDATA_API = "https://newsdata.io/api/1/news";
const NEWSDATA_KEY = process.env.NEWSDATA_KEY;

async function fetchRSS() {
  let allArticles = [];
  for (const url of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(url);

      feed.items.forEach((item) => {
        const article = {
          slug: slugify(item.link || item.title, { lower: true, strict: true }),
          title: item.title,
          image_cover: item.enclosure?.url || null,
          sources: [{ url: item.link, name: item.source || "RSS Feed" }],
          feedCategory: item.category || "", // keep original
          category_id: null,
          content: item.contentSnippet || "",
          summary: null,
          published_at: new Date(item.pubDate || Date.now()),
          updated_at: new Date(),
        };

        // detect category
        const catName = detectCategory(article);
        if (catName)
          article.category_id = sql`(
          SELECT id FROM categories WHERE name = ${catName} LIMIT 1
        )`;

        allArticles.push(article);
      });
    } catch (err) {
      console.error("RSS fetch error:", err.message);
    }
  }
  return allArticles.slice(0, 2);
}

async function fetchAPI() {
  try {
    const res = await axios.get(NEWSDATA_API, {
      params: { apikey: NEWSDATA_KEY, country: "in", language: "en" },
    });

    return res.data.results.map((item) => {
      const article = {
        slug: slugify(item.link || item.title, { lower: true, strict: true }),
        title: item.title,
        image_cover: item.image_url || null,
        sources: { type: "api", source_id: item.source_id },
        feedCategory: item.category || "",
        category_id: null,
        content: item.content || "",
        summary: null,
        published_at: new Date(item.pubDate || Date.now()),
        updated_at: new Date(),
      };

      const catName = detectCategory(article);
      if (catName)
        article.category_id = sql`(
        SELECT id FROM categories WHERE name = ${catName} LIMIT 1
      )`;

      return article.slice(0, 2);
    });
  } catch (err) {
    console.error("API fetch error:", err.message);
    return [];
  }
}

async function saveArticles(articlesList) {
  if (!articlesList.length) return;

  try {
    await db
      .insert(articles)
      .values(articlesList)
      .onConflictDoNothing({ target: articles.slug }); // ✅ prevents dupes

    console.log(`Saved batch of ${articlesList.length} articles.`);
  } catch (err) {
    console.error("DB insert error:", err.message);
  }
}

async function runWorker() {
  console.log("🚀 Fetching news...");
  const rssArticles = await fetchRSS();
  const apiArticles = await fetchAPI();
  const all = [...rssArticles, ...apiArticles]; // merge with api if needed

  await saveArticles(all);
  console.log("✅ News sync complete.");
}

// Run every 10 minutes
cron.schedule("*/10 * * * *", runWorker);

module.exports = { runWorker };
