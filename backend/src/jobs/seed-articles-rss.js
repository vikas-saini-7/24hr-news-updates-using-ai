const cron = require("node-cron");
const axios = require("axios");
const Parser = require("rss-parser");
const slugify = require("slugify");
const { db } = require("../lib/db");
const { articles, categories } = require("../lib/schema");
const { detectCategory } = require("../lib/category");
const { eq } = require("drizzle-orm");
const { appendLogs } = require("../utils/report-generation/logger");

const parser = new Parser({
  customFields: {
    item: [
      ["description", "description"],
      ["source", "source"],
    ],
  },
});

function cleanHTML(html) {
  if (!html) return "";

  // Replace deprecated <font> tags with <span> and CSS classes
  let cleanedHTML = html
    .replace(/<font color="#6f6f6f">/g, '<span class="text-gray-500">')
    .replace(/<\/font>/g, "</span>")
    // You can add more replacements as needed
    .replace(/&nbsp;&nbsp;/g, " ") // Replace double non-breaking spaces
    .trim();

  return cleanedHTML;
}

function parseGoogleRSSDescription(description) {
  if (!description) return { sources: [], cleanHTML: "" };

  const sources = [];
  const sourceRegex =
    /<a href="([^"]+)"[^>]*>([^<]+)<\/a>&nbsp;&nbsp;<font color="#6f6f6f">([^<]+)<\/font>/g;
  let match;

  while ((match = sourceRegex.exec(description)) !== null) {
    const [, url, title, sourceName] = match;
    sources.push({
      url: url,
      title: title.trim(),
      sourceName: sourceName.trim(),
    });
  }

  return {
    sources: sources,
    cleanHTML: cleanHTML(description),
    mainSource: sources[0]?.sourceName || "Google News",
  };
}

// 📰 RSS Feeds
const RSS_FEEDS = ["https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en"];

async function fetchRSS() {
  let allArticles = [];
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  for (const url of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(url);

      for (const item of feed.items) {
        // Generate slug
        const slug = slugify(item.title, { lower: true, strict: true });
        // Some feeds have <media:content>

        const mediaContent = item["media:content"]?.[0]?.["$"]?.url || null;

        const parsedContent = parseGoogleRSSDescription(item.description);

        const publishedDate = new Date(item.pubDate);

        // Skip articles older than 24 hours
        if (publishedDate < twentyFourHoursAgo) {
          continue;
        }

        // Get category ID if category is detected
        let categoryId = null;
        const catName = detectCategory({
          title: item.title,
          content: parsedContent.cleanHTML,
        });

        // Skip if no category is detected
        if (!catName) {
          continue;
        }

        if (catName) {
          try {
            const categoryResult = await db
              .select({ id: categories.id })
              .from(categories)
              .where(eq(categories.name, catName))
              .limit(1);

            if (categoryResult.length > 0) {
              categoryId = categoryResult[0].id;
            }
          } catch (err) {
            console.error("Category fetch error:", err.message);
          }
        }

        // Create sources array with just URLs from parsed content
        const sourcesArray = [];

        // Only add sources from parsed content (actual article URLs, not Google redirects)
        if (parsedContent.sources && parsedContent.sources.length > 0) {
          parsedContent.sources.forEach((source) => {
            if (source.url && !sourcesArray.some((s) => s.url === source.url)) {
              sourcesArray.push({
                name: source.sourceName || "Unknown Source",
                url: source.url,
              });
            }
          });
        }

        // If no sources found, add a default Google News source
        if (sourcesArray.length === 0) {
          sourcesArray.push({
            name: "Google News",
            url: item.link || item.guid,
          });
        }

        // Debug log to see what we're storing
        // console.log("Sources array:", sourcesArray);

        const article = {
          slug: slug,
          title: item.title,
          image_cover: mediaContent,
          sources: sourcesArray, // Store as array directly (not stringified)
          category_id: categoryId,
          content: parsedContent.cleanHTML,
          summary: null,
          published_at: publishedDate,
        };

        // Only push if required fields are present
        if (article.title && article.content && sourcesArray.length > 0) {
          allArticles.push(article);
        }
      }
    } catch (err) {
      console.error("RSS fetch error:", err.message);
    }
  }
  return allArticles.slice(0, 2);
}

async function saveArticles(articlesList) {
  if (!articlesList.length) return;

  try {
    await db
      .insert(articles)
      .values(articlesList)
      .onConflictDoNothing({ target: articles.slug }); // ✅ prevents dupes

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

async function runRSSWorker() {
  console.log("🚀 Fetching news...");
  try {
    const rssArticles = await fetchRSS();
    console.log(`Fetched ${rssArticles.length} articles from rss feeds.`);

    // await saveArticles(rssArticles);
    console.log("✅ News sync complete.");
  } catch (err) {
    console.error("Worker error:", err.message);
  }
}

// Run every 10 minutes
cron.schedule("*/10 * * * *", runRSSWorker);

module.exports = { runRSSWorker };
