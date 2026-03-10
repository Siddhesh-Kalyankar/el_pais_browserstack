const { navigateToOpinion } = require("./scraper/navigation");
const { scrapeArticles } = require("./scraper/opinionScraper");
const { translateToEnglish } = require("./services/translation.service");
const { analyzeWordFrequency } = require("./services/textAnalysis.service");

async function runTestFlow(driver) {
  try {
    console.log("Opening Opinion Section...");
    await navigateToOpinion(driver);

    console.log("Scraping articles...");
    const articles = await scrapeArticles(driver);

    if (!articles || articles.length === 0) {
      console.log("No articles found.");
      return;
    }

    console.log("\nFirst 5 Articles (Spanish):\n");

    articles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
    });

    console.log("\nTranslated Titles (English):\n");

    const translatedTitles = [];

    for (let i = 0; i < articles.length; i++) {
      try {
        const translated = await translateToEnglish(articles[i].title);
        translatedTitles.push(translated);
        console.log(`${i + 1}. ${translated}`);
      } catch (err) {
        console.log(`${i + 1}. Translation failed`);
      }
    }

    const repeated = analyzeWordFrequency(translatedTitles);

    console.log("\nRepeated Words (>2 times):\n");

    if (Object.keys(repeated).length === 0) {
      console.log("No words repeated more than twice.");
    } else {
      for (const word in repeated) {
        console.log(`${word} → ${repeated[word]} times`);
      }
    }

  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

module.exports = { runTestFlow };