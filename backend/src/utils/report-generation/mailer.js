const nodemailer = require("nodemailer");

// Configure transporter once
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password if Gmail
  },
});

/**
 * Reusable sendMail function
 * @param {Object} options
 * @param {string} options.to - recipient email
 * @param {string} options.subject - email subject
 * @param {string} options.html - email body in HTML
 * @param {Array} [options.attachments] - attachments [{ filename, path }]
 */
async function sendMail({ to, subject, html, attachments = [] }) {
  try {
    const mailOptions = {
      from: `"Express Logger" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
  } catch (err) {
    console.error("❌ Mail error:", err.message);
  }
}

module.exports = { sendMail };
