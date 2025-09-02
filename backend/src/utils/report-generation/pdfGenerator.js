const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");

function generateReportPDF(logs, stats) {
  const pdfPath = path.join(__dirname, "../../logs/daily-report.pdf");
  const doc = new PDFDocument({ margin: 50 });

  doc.pipe(fs.createWriteStream(pdfPath));

  // ===== First Page =====
  doc.fontSize(20).text("Daily Platform Report - 24hr-News-AI", {
    align: "center",
  });

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor("gray").text(today, { align: "center" });
  doc.moveDown(2);

  // Grid box dimensions
  const startX = 70;
  const startY = 180;
  const boxWidth = 200;
  const boxHeight = 80;
  const gapX = 40;
  const gapY = 40;

  // Box styles (background + border)
  const boxes = [
    { label: "Total Users", value: stats.users },
    { label: "Active Articles", value: stats.articles },
    { label: "Active Categories", value: stats.categories },
    { label: "Total Saved Articles", value: stats.savedArticles },
  ];

  boxes.forEach((box, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;
    const x = startX + col * (boxWidth + gapX);
    const y = startY + row * (boxHeight + gapY);

    // Faded background
    doc.rect(x, y, boxWidth, boxHeight).fillOpacity(0.1).fill("#e0e0e0");

    // Border
    doc
      .lineWidth(2)
      .strokeColor("#333")
      .rect(x, y, boxWidth, boxHeight)
      .stroke();

    // Text inside box
    doc
      .fillOpacity(1)
      .fontSize(12)
      .fillColor("black")
      .text(box.label, x + 15, y + 15);

    doc
      .fontSize(16)
      .fillColor("#000")
      .text(box.value.toString(), x + 15, y + 40);
  });

  // ===== New page for logs =====
  doc.addPage();

  doc
    .fontSize(18)
    .fillColor("black")
    .text("Today's Newly added News Articles", { align: "center" });
  doc.moveDown(1);

  if (!logs.length) {
    doc.fontSize(14).fillColor("black").text("No logs today ✅", {
      align: "center",
    });
  } else {
    logs.forEach((log, i) => {
      doc
        .fontSize(12)
        .fillColor("black")
        .text(`${i + 1}. ${log.title}`);
      doc
        .fontSize(10)
        .fillColor("gray")
        .text(`${log.time}   |   ${log.category}`, { indent: 20 });
      doc.moveDown(0.8);
    });
  }

  doc.end();
  return pdfPath;
}

module.exports = { generateReportPDF };
