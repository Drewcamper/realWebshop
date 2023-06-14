import React from "react";

function WordCounter() {
  const text = 'hello hello world world world world world world hi hi hi bye';
  const n = 3;
  const words = text.split(" ");
  const wordCountMap = new Map();

  // Count the occurrences of each word
  words.forEach((word) => {
    const cleanedWord = word.replace(/[^\w\s]/g, "").toLowerCase();
    if (cleanedWord) {
      const count = wordCountMap.get(cleanedWord) || 0;
      wordCountMap.set(cleanedWord, count + 1);
    }
  });

  // Sort the word-count pairs
  const sortedWordCounts = Array.from(wordCountMap.entries()).sort((a, b) => b[1] - a[1]);

  // Display the most frequent words
  const mostFrequentWords = sortedWordCounts.slice(0, n);

  return (
    <div>
      {mostFrequentWords.map(([word, count]) => (
        <div key={word}>
          {word}: {count}
        </div>
      ))}
    </div>
  );
}

export default WordCounter;
