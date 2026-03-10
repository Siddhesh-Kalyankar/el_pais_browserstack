const { By, until } = require("selenium-webdriver");
const { OPINION_URL } = require("../config/constants");

async function navigateToOpinion(driver) {
  await driver.get(OPINION_URL);

  // Wait for body to load
  await driver.wait(until.elementLocated(By.css("body")), 10000);

  // Wait for page ready state
  await driver.wait(async () => {
    const state = await driver.executeScript("return document.readyState");
    return state === "complete";
  }, 10000);

  // Scroll slightly to trigger lazy loading
  await driver.executeScript("window.scrollBy(0, 500);");

  // Wait for opinion article titles
  await driver.wait(
    until.elementsLocated(By.css("h2 a")),
    10000
  );
}

module.exports = { navigateToOpinion };