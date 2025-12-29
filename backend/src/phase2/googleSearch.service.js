const axios = require("axios");

const SERPER_URL = "https://google.serper.dev/search";

async function searchGoogleForArticles(query) {
  const response = await axios.post(
    SERPER_URL,
    {
      q: query,
      num: 5
    },
    {
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );

  const results = response.data.organic || [];

  // Filter only blog/article type pages
  const filtered = results.filter(item => {
    const link = item.link || "";
    return (
      !link.includes("youtube") &&
      !link.includes("reddit") &&
      !link.includes("facebook") &&
      !link.includes("twitter")
    );
  });

  // Return top 2
  return filtered.slice(0, 2).map(item => ({
    title: item.title,
    link: item.link
  }));
}

module.exports = searchGoogleForArticles;
