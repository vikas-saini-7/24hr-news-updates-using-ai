require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

// background cron jobs
// const { runRSSWorker } = require("./jobs/seed-articles-rss.js");
// const { runAPIWorker } = require("./jobs/seed-articles-api.js");
require("./jobs/daily-report-mail.js");

const apiRoutes = require("./routes/index.js");

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", apiRoutes);

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

// runRSSWorker();
// runAPIWorker();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
