const express = require("express");
const router = express.Router();
const { quizApiKey } = require("../../config/keys");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// VERSION get 10 from each
router.get("/", async (req, res) => {
  try {
    const apiKey = quizApiKey;
    const url = "https://quizapi.io/api/v1/questions";
    const tags = ["javascript", "html", "mysql"];
    const questionsPerTag = 10;

    const requestPromises = [];

    // Send requests for questions from each tag
    for (const tag of tags) {
      const params = new URLSearchParams({
        apiKey,
        limit: questionsPerTag,
        tags: tag,
        difficulty: "easy",
      });
      const request = fetch(url + "?" + params.toString());
      requestPromises.push(request);
    }

    const responses = await Promise.all(requestPromises);
    const questions = [];

    // Process responses and concatenate the questions
    for (const response of responses) {
      const data = await response.json();
      questions.push(...data);
    }
    const uniqueQuestions = questions.filter(
      (question, index, self) =>
        index === self.findIndex((q) => q.id === question.id)
    );

    return res.json(uniqueQuestions);
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
