const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { OUTPUT_IMAGE_PATH } = require("../config/constants");

async function downloadImage(url, filename) {
  try {

    // Ensure folder exists
    if (!fs.existsSync(OUTPUT_IMAGE_PATH)) {
      fs.mkdirSync(OUTPUT_IMAGE_PATH, { recursive: true });
    }

    const response = await axios({
      url,
      responseType: "stream",
      timeout: 10000
    });

    const filePath = path.join(OUTPUT_IMAGE_PATH, filename);
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

  } catch (err) {
    console.log("Image download failed:", err.message);
  }
}

module.exports = { downloadImage };