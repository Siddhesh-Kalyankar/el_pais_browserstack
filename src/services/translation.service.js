const axios = require("axios");

// Using free MyMemory API (no key required)
async function translateToEnglish(text) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|en`;

    const response = await axios.get(url, {
      timeout: 10000
    });

    if (
      response.data &&
      response.data.responseData &&
      response.data.responseData.translatedText
    ) {
      return response.data.responseData.translatedText;
    }

    return text;

  } catch (error) {
    console.log("Translation error:", error.message);
    return text; // fallback to original
  }
}

module.exports = { translateToEnglish };