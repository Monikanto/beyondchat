const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

const BASE_URL = "https://beyondchats.com";

async function scrapeOldestArticles() {
  console.log("Starting scrape...");

  const page = await axios.get(`${BASE_URL}/blogs/`);
  const $ = cheerio.load(page.data);

  const articleLinks = new Set();

  $("a").each((_, el) => {
    let href = $(el).attr("href");

    // Only valid blog article URLs
    if (
      href &&
      href.startsWith("/blogs/") &&
      href !== "/blogs/" &&
      href.split("/").length > 3
    ) {
      articleLinks.add(BASE_URL + href);
    }
  });

  const linksArray = Array.from(articleLinks);
  console.log("Valid article links found:", linksArray.length);

  // Pick 5 oldest (last ones)
  const oldestFive = linksArray.slice(-5);
  console.log("Scraping these:", oldestFive);

  for (const link of oldestFive) {
    try {
      // Avoid duplicates
      const exists = await Article.findOne({ url: link });
      if (exists) {
        console.log("Already exists, skipping:", link);
        continue;
      }

      const articlePage = await axios.get(link);
      const $$ = cheerio.load(articlePage.data);

      

      //for removing some noice data not relavent data
      const title = $$("h1").first().text().trim();
      const content = $$("article")
        .find("p")
        .map((_, el) => $$(el).text())
        .get()
        .join("\n\n");


      if (!title || !content) {
        console.log("Empty content, skipped:", link);
        continue;
      }

      await Article.create({
        title,
        url: link,
        content,
        publishedAt: new Date(),
      });

      console.log("Saved:", title);
    } catch (err) {
      console.error("Failed:", link);
    }
  }

  console.log("Scraping finished");
}

module.exports = scrapeOldestArticles;
