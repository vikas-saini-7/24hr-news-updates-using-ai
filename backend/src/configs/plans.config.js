export const plans = {
  FREE: {
    name: "FREE",
    sentiment_limit: 10, // 10 requests per day
  },
  PREMIUM: {
    name: "PREMIUM",
    sentiment_limit: Infinity, // unlimited
  },
};
