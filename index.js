const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeComic(url, pageNum) {
  const pageUrl = `${url}/archive/page/${pageNum}`;
  console.log(`Scraping ${pageUrl}...`);

  const response = await axios.get(pageUrl);
  const $ = cheerio.load(response.data);
  const comicTitles = [];

  $(".et_pb_post").each((index, element) => {
    if (index < 10) {
      const comicTitle = $(element).find(".entry-title a").text().trim();
      comicTitles.push(comicTitle);
    }
  });

  return comicTitles;
}

async function fetchAndDisplayComics() {
  try {
    for (let pageNum = 1; pageNum <= 10; pageNum++) {
      console.log(
        `Scraping https://poorlydrawnlines.com/archive/page/${pageNum}...`
      );
      const comicTitles = await scrapeComic(
        "https://poorlydrawnlines.com",
        pageNum
      );

      comicTitles.forEach((title, index) => {
        console.log(`${index + 1}. Title: ${title}`);
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error("Error fetching comics:", error);
  }
}

fetchAndDisplayComics();
