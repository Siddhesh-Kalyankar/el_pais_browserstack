function analyzeWordFrequency(titles) {

  const wordMap = {};

  for (let title of titles) {

    const cleanTitle = title
      .toLowerCase()
      .replace(/[^\w\s]/g, ""); // remove punctuation

    const words = cleanTitle.split(/\s+/);

    for (let word of words) {

      if (!word || word.length < 3) continue; // ignore empty or small words

      wordMap[word] = (wordMap[word] || 0) + 1;
    }
  }

  const repeatedWords = {};

  for (let word in wordMap) {
    if (wordMap[word] > 2) {
      repeatedWords[word] = wordMap[word];
    }
  }

  return repeatedWords;
}

module.exports = { analyzeWordFrequency };