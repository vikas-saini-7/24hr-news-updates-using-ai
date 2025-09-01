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

// Enhanced keyword mapping with more comprehensive terms
const categoryKeywords = {
  Technology: [
    "artificial intelligence",
    "machine learning",
    "software development",
    "cybersecurity",
    "blockchain",
    "cryptocurrency",
    "bitcoin",
    "ethereum",
    "programming",
    "developer",
    "silicon valley",
    "cloud computing",
    "robotics",
    "automation",
    "algorithm",
    "tech startup",
    "google tech", // More specific
    "apple tech", // More specific
    "microsoft tech", // More specific
    "tesla tech", // More specific
    "spacex",
    "ai technology",
    "machine learning model",
    "neural network",
    "data science",
    "computer science",
    "software engineer",
    "tech innovation",
    "digital transformation",
  ],
  Health: [
    "health",
    "healthcare",
    "medical",
    "medicine",
    "doctor",
    "hospital",
    "covid",
    "coronavirus",
    "vaccine",
    "virus",
    "disease",
    "illness",
    "treatment",
    "therapy",
    "surgery",
    "patient",
    "drug",
    "pharmaceutical",
    "mental health",
    "wellness",
    "fitness",
    "nutrition",
    "diet",
    "cancer",
    "diabetes",
    "heart",
    "brain",
    "clinical",
    "epidemic",
    "pandemic",
    "who",
    "fda",
    "cdc",
  ],
  Business: [
    "business",
    "market",
    "economy",
    "economic",
    "finance",
    "financial",
    "stock",
    "shares",
    "trading",
    "investment",
    "investor",
    "banking",
    "company",
    "corporate",
    "ceo",
    "revenue",
    "profit",
    "loss",
    "merger",
    "acquisition",
    "ipo",
    "earnings",
    "quarterly",
    "nasdaq",
    "dow jones",
    "wall street",
    "inflation",
    "recession",
    "gdp",
    "startup",
    "venture capital",
    "funding",
  ],
  Entertainment: [
    "movie",
    "film",
    "cinema",
    "hollywood",
    "bollywood",
    "actor",
    "actress",
    "music",
    "song",
    "album",
    "concert",
    "festival",
    "show",
    "tv",
    "television",
    "series",
    "netflix",
    "streaming",
    "celebrity",
    "entertainment",
    "game",
    "gaming",
    "video game",
    "esports",
    "art",
    "artist",
    "fashion",
    "style",
    "awards",
    "oscar",
    "grammy",
  ],
  Sports: [
    "sport",
    "sports",
    "cricket",
    "football",
    "soccer",
    "basketball",
    "tennis",
    "golf",
    "baseball",
    "hockey",
    "swimming",
    "athletics",
    "olympics",
    "world cup",
    "championship",
    "match",
    "game",
    "player",
    "team",
    "coach",
    "tournament",
    "league",
    "ipl",
    "nfl",
    "nba",
    "fifa",
    "kabaddi",
    "badminton",
    "wrestling",
    "boxing",
    "racing",
  ],
  Science: [
    "science",
    "scientific",
    "research",
    "study",
    "experiment",
    "discovery",
    "climate",
    "environment",
    "global warming",
    "space",
    "nasa",
    "astronomy",
    "physics",
    "chemistry",
    "biology",
    "genetics",
    "dna",
    "gene",
    "laboratory",
    "scientist",
    "university",
    "academic",
    "journal",
    "innovation",
    "breakthrough",
    "energy",
    "renewable",
    "solar",
  ],
  Politics: [
    "politic",
    "politics",
    "political",
    "election",
    "vote",
    "voting",
    "government",
    "minister",
    "president",
    "prime minister",
    "congress",
    "parliament",
    "senate",
    "policy",
    "law",
    "legislation",
    "democracy",
    "republican",
    "democrat",
    "party",
    "campaign",
    "candidate",
    "biden",
    "trump",
    "modi",
    "bjp",
    "congress party",
  ],
  World: [
    "world",
    "international",
    "global",
    "country",
    "nation",
    "foreign",
    "diplomatic",
    "embassy",
    "united nations",
    "un",
    "nato",
    "eu",
    "china",
    "chinese",
    "america",
    "american",
    "usa",
    "uk",
    "britain",
    "russia",
    "russian",
    "japan",
    "japanese",
    "germany",
    "france",
    "india",
    "pakistan",
    "middle east",
    "europe",
    "asia",
    "africa",
  ],
};

function detectCategory(article) {
  if (!article || (!article.title && !article.content)) {
    return null;
  }

  // Combine all text sources and normalize
  const text = `${article.title || ""} ${article.content || ""} ${
    article.feedCategory || ""
  }`
    .toLowerCase()
    .trim();

  if (!text) return null;

  // Score each category based on keyword matches
  const categoryScores = {};

  Object.keys(categoryKeywords).forEach((category) => {
    categoryScores[category] = 0;

    categoryKeywords[category].forEach((keyword) => {
      const regex = new RegExp(
        `\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "gi"
      );
      const matches = text.match(regex);
      if (matches) {
        // Give more weight to longer, more specific keywords
        const weight = keyword.length > 10 ? 3 : keyword.length > 5 ? 2 : 1;
        categoryScores[category] += matches.length * weight;
      }
    });
  });

  // Find the category with the highest score
  let bestCategory = null;
  let highestScore = 0;

  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score > highestScore) {
      highestScore = score;
      bestCategory = category;
    }
  });

  // console.log("Detected category:", bestCategory);

  // Only return a category if we have a reasonable confidence (score > 0)
  return highestScore > 0 ? bestCategory : null;
}

// Optional: Function to get category confidence score
function getCategoryConfidence(article) {
  if (!article || (!article.title && !article.content)) {
    return { category: null, confidence: 0 };
  }

  const text = `${article.title || ""} ${article.content || ""} ${
    article.feedCategory || ""
  }`
    .toLowerCase()
    .trim();

  const categoryScores = {};
  let totalScore = 0;

  Object.keys(categoryKeywords).forEach((category) => {
    categoryScores[category] = 0;

    categoryKeywords[category].forEach((keyword) => {
      const regex = new RegExp(
        `\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "gi"
      );
      const matches = text.match(regex);
      if (matches) {
        const weight = keyword.length > 10 ? 3 : keyword.length > 5 ? 2 : 1;
        categoryScores[category] += matches.length * weight;
      }
    });

    totalScore += categoryScores[category];
  });

  const bestCategory = Object.entries(categoryScores).reduce(
    (best, [category, score]) =>
      score > best.score ? { category, score } : best,
    { category: null, score: 0 }
  );

  const confidence =
    totalScore > 0 ? (bestCategory.score / totalScore) * 100 : 0;

  return {
    category: bestCategory.score > 0 ? bestCategory.category : null,
    confidence: Math.round(confidence),
    scores: categoryScores,
  };
}

module.exports = { categoryNames, detectCategory, getCategoryConfidence };
