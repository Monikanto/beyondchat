require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/article.routes");
const scrapeOldestArticles = require("./services/scraper.service");
const searchGoogleForArticles = require("./phase2/googleSearch.service");
const Article = require("./models/Article");
const scrapeArticleContent = require("./phase2/articleScraper.service");



const app = express();
app.use(express.json());

connectDB();

// Routes
app.use("/articles", articleRoutes);



//scrape route
app.get("/phase2/search/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  const results = await searchGoogleForArticles(article.title);

  res.json({
    originalTitle: article.title,
    googleResults: results
  });
});




app.post("/phase2/scrape-refs", async (req, res) => {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ message: "urls array required" });
  }

  const results = [];

  for (const url of urls) {
    try {
      const content = await scrapeArticleContent(url);
      results.push({
        url,
        content: content.slice(0, 1500) // limit for testing
      });
    } catch (err) {
      results.push({
        url,
        error: "Failed to scrape"
      });
    }
  }

  res.json(results);
});



// One-time scrape endpoint
app.get("/scrape", async (req, res) => {
  await scrapeOldestArticles();
  res.json({ message: "Scraping completed" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
