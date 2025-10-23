const { db } = require("../lib/db");
const { usage } = require("../lib/schema.js");
const { eq } = require("drizzle-orm");

exports.fetchUsage = async ({ userId }) => {
  try {
    // Fetch usage data from the database
    const usageData = await db
      .select({
        sentiment_count: usage.sentiment_count,
        last_used_date: usage.last_used_date,
      })
      .from(usage)
      .where(eq(usage.user_id, userId));

    if (usageData.length === 0) {
      return {
        sentiment_count: 0,
        last_used_date: null,
      };
    }

    return usageData[0];
  } catch (error) {
    console.error("Error fetching usage data:", error);
    throw new Error("Could not fetch usage data");
  }
};
