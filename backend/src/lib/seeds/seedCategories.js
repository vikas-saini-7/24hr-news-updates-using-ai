const { db } = require("../db.js");
const { categories } = require("../schema.js");
const { categoryNames } = require("./categories.js");

async function seedCategories() {
  try {
    for (const name of categoryNames) {
      await db.insert(categories).values({ name }).onConflictDoNothing();
    }
    console.log("✅ Categories seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
  } finally {
    process.exit(0);
  }
}

seedCategories();
