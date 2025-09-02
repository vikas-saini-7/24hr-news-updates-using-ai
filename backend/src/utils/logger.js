const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "../logs");
const LOG_FILE = path.join(LOG_DIR, "daily.json");

// Ensure /logs directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// Initialize log file if not present
if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, JSON.stringify([]), "utf-8");
}

/**
 * Append new entries to daily log file
 * @param {Array} entries [{ title, category, time }]
 */
function appendLogs(entries) {
  try {
    const currentLogs = JSON.parse(fs.readFileSync(LOG_FILE, "utf-8"));
    const updatedLogs = [...currentLogs, ...entries];
    fs.writeFileSync(LOG_FILE, JSON.stringify(updatedLogs, null, 2), "utf-8");
    console.log(`📝 Appended ${entries.length} items to log file.`);
  } catch (err) {
    console.error("Log write error:", err.message);
  }
}

/**
 * Reset log file (call this after email has been sent)
 */
function resetLogs() {
  fs.writeFileSync(LOG_FILE, JSON.stringify([], null, 2), "utf-8");
  console.log("🔄 Logs reset.");
}

module.exports = { appendLogs, resetLogs, LOG_FILE };
