const { integer } = require("drizzle-orm/pg-core");
const { date } = require("drizzle-orm/pg-core");
const {
  pgTable,
  uuid,
  varchar,
  timestamp,
  primaryKey,
  text,
  json,
} = require("drizzle-orm/pg-core");

// Users table
const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  avatar: varchar("avatar", { length: 255 }), // optional profile pic
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),

  plan: varchar("plan", { length: 50 }).default("FREE").notNull(),
});

const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  status: varchar("status", { length: 50 }).notNull(), // active, canceled, revoked
  provider: varchar("provider", { length: 100 }).notNull(), // e.g., stripe
  provider_subscription_id: varchar("provider_subscription_id", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

const usage = pgTable("usage", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  sentiment_count: integer("sentiment_count").default(0).notNull(),
  last_used_date: date("last_used_date"),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Category
const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Article Table
const articles = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  title: varchar("title", { length: 300 }).notNull(),
  image_cover: varchar("image_cover", { length: 500 }),
  sources: json("sources").notNull(),
  category_id: uuid("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  content: text("content").notNull(), // HTML string
  summary: text("summary"), // summary may be generated with ai
  published_at: timestamp("published_at").notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Saved Article
const savedArticles = pgTable(
  "saved_articles",
  {
    user_id: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    article_id: uuid("article_id")
      .references(() => articles.id, { onDelete: "cascade" })
      .notNull(),
    saved_at: timestamp("saved_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.user_id, table.article_id] }),
  })
);

module.exports = {
  users,
  articles,
  categories,
  savedArticles,
  usage,
  subscriptions,
};
