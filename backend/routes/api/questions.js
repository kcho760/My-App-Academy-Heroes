const express = require("express");
const router = express.Router();
const { quizApiKey } = require("../../config/keys");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// VERSION 2 Parallel request - improves performance
router.get('/', async (req, res) => {
  try {
    const apiKey = quizApiKey;
    const url = 'https://quizapi.io/api/v1/questions';
    const strings = ['javascript', 'html', 'mysql'];
    const randomIndex = (array) => Math.floor(Math.random() * array.length);

    const requestPromises = [];

    // Send requests for all question sets in parallel
    for (let i = 0; i < 3; i++) {
      const randomIdx = randomIndex(strings);
      const tag = strings[randomIdx];
      const params = new URLSearchParams({
        apiKey,
        limit: 6,
        tags: tag,
        difficulty: 'easy',
      });
      const request = fetch(url + '?' + params.toString());
      requestPromises.push(request);
    }

    const responses = await Promise.all(requestPromises);
    const questions = [];

    // Process responses and concatenate the questions
    for (const response of responses) {
      const data = await response.json();
      console.log(data);
      questions.push(...data);
    }

    return res.json(questions);
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
