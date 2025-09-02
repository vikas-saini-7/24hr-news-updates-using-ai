const fs = require("fs");
const cron = require("node-cron");
const { LOG_FILE, resetLogs } = require("../utils/report-generation/logger");
const { sendMail } = require("../utils/report-generation/mailer");
const {
  generateReportPDF,
} = require("../utils/report-generation/pdfGenerator");
const {
  getPlatformStats,
} = require("../utils/report-generation/getPlatformStats");
const {
  purgeOldArticles,
} = require("../utils/report-generation/purgeOldArticles");

async function sendDailyLogs() {
  try {
    // 1. Purge old articles
    await purgeOldArticles();

    // 2. Load logs
    const logs = JSON.parse(fs.readFileSync(LOG_FILE, "utf-8"));

    // 3. Get updated stats after purge
    const stats = await getPlatformStats(); // fetch counts from DB

    // 4. Generate PDF
    const pdfPath = generateReportPDF(logs, stats);

    // 5. Send email
    await sendMail({
      to: process.env.EMAIL_USER,
      subject: "📩 Daily Platform Report",
      html: `<p>Attached is today's platform report (stats + logs).</p>`,
      attachments: [{ filename: "daily-report.pdf", path: pdfPath }],
    });
  } catch (error) {
    console.error("❌ Error sending daily logs email:", error);
  }

  // resetLogs();
}

if (process.env.NODE_ENV !== "production") {
  try {
    sendDailyLogs();
  } catch (error) {
    console.log(error);
  }
}

// Run every day at 10 PM
cron.schedule("0 22 * * *", () => {
  console.log("⏰ Running daily log mailer job at 10 PM...");
  sendDailyLogs();
});
