const { db } = require("../db.js");
const { categories } = require("../schema.js");

async function getCategories() {
  try {
    const result = await db.select().from(categories);
    console.log("📂 Categories as objects:");
    console.log(result); // prints as array of objects
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
  } finally {
    process.exit(0);
  }
}

getCategories();
