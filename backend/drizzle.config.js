require("dotenv").config();
// drizzle.config.js

/** @type { import("drizzle-kit").Config } */
module.exports = {
  schema: "./src/lib/schema.js", // point this to your actual schema file
  out: "./drizzle/migrations", // where migrations will be stored
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
