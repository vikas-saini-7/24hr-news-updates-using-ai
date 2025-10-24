const { plans } = require("../configs/plans.config.js");
const { db } = require("../lib/db.js");
const { usage, users } = require("../lib/schema.js");
const { AppError } = require("../utils/global-error-handler/AppError.js");
const { eq } = require("drizzle-orm");

const usageLimiter = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // 1. Fetch user
    const user = (await db.select().from(users).where(eq(users.id, userId)))[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    // 2. Premium users are unlimited
    if (user.plan === "premium") return next();

    const today = new Date().toISOString().split("T")[0];

    // 3. Fetch usage row for this user
    let userUsage = (
      await db.select().from(usage).where(eq(usage.user_id, userId))
    )[0];

    // 4. If first time, create usage record
    if (!userUsage) {
      await db.insert(usage).values({
        user_id: userId,
        sentiment_count: 1,
        last_used_date: today,
      });
      return next();
    }

    // 5. If last_used_date is not today, reset
    if (userUsage.last_used_date !== today) {
      await db
        .update(usage)
        .set({ sentiment_count: 1, last_used_date: today })
        .where(eq(usage.user_id, userId));
      return next();
    }

    // 6. Check limit
    if (userUsage.sentiment_count >= plans[user.plan].sentiment_limit) {
      throw new AppError(
        `Your daily limit expired. Subscribe for more usage.`,
        429
      );
    }

    // 7. Increment usage
    await db
      .update(usage)
      .set({ sentiment_count: userUsage.sentiment_count + 1 })
      .where(eq(usage.user_id, userId));

    next();
  } catch (err) {
    console.error("Usage limiter error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = usageLimiter;
