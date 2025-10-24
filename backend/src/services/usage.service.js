const { db } = require("../lib/db");
const { usage } = require("../lib/schema.js");
const { eq } = require("drizzle-orm");

exports.fetchUsage = async ({ userId }) => {
  try {
    const today = new Date().toISOString().split("T")[0];

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

    const userUsage = usageData[0];

    // If last_used_date is not today, reset count to 0 and update database
    if (userUsage.last_used_date !== today) {
      await db
        .update(usage)
        .set({ sentiment_count: 0, last_used_date: today })
        .where(eq(usage.user_id, userId));

      return {
        sentiment_count: 0,
        last_used_date: today,
      };
    }

    return userUsage;
  } catch (error) {
    console.error("Error fetching usage data:", error);
    throw new Error("Could not fetch usage data");
  }
};
