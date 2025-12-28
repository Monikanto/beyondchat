require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/article.routes");
const scrapeOldestArticles = require("./services/scraper.service");

const app = express();
app.use(express.json());

connectDB();

// Routes
app.use("/articles", articleRoutes);

// One-time scrape endpoint
app.get("/scrape", async (req, res) => {
  await scrapeOldestArticles();
  res.json({ message: "Scraping completed" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
