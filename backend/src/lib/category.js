const categoryNames = [
  "Technology",
  "Health",
  "Business",
  "Entertainment",
  "Sports",
  "Science",
  "Politics",
  "World",
];

function detectCategory(article) {
  const text = `${article.title} ${article.content} ${
    article.feedCategory || ""
  }`.toLowerCase();

  if (text.includes("tech") || text.includes("ai") || text.includes("software"))
    return "Technology";

  if (
    text.includes("health") ||
    text.includes("medical") ||
    text.includes("covid")
  )
    return "Health";

  if (
    text.includes("business") ||
    text.includes("market") ||
    text.includes("economy")
  )
    return "Business";

  if (
    text.includes("movie") ||
    text.includes("film") ||
    text.includes("music") ||
    text.includes("show")
  )
    return "Entertainment";

  if (
    text.includes("sport") ||
    text.includes("cricket") ||
    text.includes("football") ||
    text.includes("kabaddi")
  )
    return "Sports";

  if (
    text.includes("science") ||
    text.includes("research") ||
    text.includes("climate")
  )
    return "Science";

  if (
    text.includes("politic") ||
    text.includes("election") ||
    text.includes("government")
  )
    return "Politics";

  if (
    text.includes("world") ||
    text.includes("us ") ||
    text.includes("china") ||
    text.includes("global")
  )
    return "World";

  return null;
}

module.exports = { categoryNames, detectCategory };
