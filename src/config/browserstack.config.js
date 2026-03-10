require("dotenv").config();

const USERNAME = process.env.BROWSERSTACK_USERNAME;
const ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;

if (!USERNAME || !ACCESS_KEY) {
  throw new Error("BrowserStack credentials missing in .env file");
}

module.exports = {
  USERNAME,
  ACCESS_KEY,
  HUB_URL: "https://hub-cloud.browserstack.com/wd/hub"
};