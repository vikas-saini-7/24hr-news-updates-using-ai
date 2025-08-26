const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres");

const connectionString = process.env.DATABASE_URL;

// Disable prefetch as it is not supported in "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });

const db = drizzle(client);

module.exports = { db };
