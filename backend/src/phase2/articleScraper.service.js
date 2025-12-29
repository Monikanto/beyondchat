const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Scrape main readable content from a blog/article URL
 * Returns clean text with headings and paragraphs
 */
async function scrapeArticleContent(url) {
  const response = await axios.get(url, {
    headers: {
      // Helps avoid simple bot blocks
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
  });

  const $ = cheerio.load(response.data);

  // Remove obvious noise
  $("script, style, nav, footer, header, iframe, ads, noscript").remove();

  // Try common article containers first
  let container =
    $("article").first().length
      ? $("article").first()
      : $("main").first().length
      ? $("main").first()
      : $("body");

  const content = [];

  container.find("h1, h2, h3, p").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 40) {
      content.push(text);
    }
  });

  return content.join("\n\n");
}

module.exports = scrapeArticleContent;
