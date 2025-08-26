require("dotenv").config();
const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres");

const connectionString = process.env.DATABASE_URL;

const client = postgres(connectionString, {
  prepare: false,
  //   ssl: { rejectUnauthorized: false },
});

const db = drizzle(client);

module.exports = { db };
