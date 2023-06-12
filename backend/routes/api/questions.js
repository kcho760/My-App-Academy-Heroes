const express = require("express");
const router = express.Router();
const { quizApiKey } = require("../../config/keys");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.get("/", async (req, res) => {
  try {
    const strings = ["javascript", "html", "mysql"];
    const randomIndex = Math.floor(Math.random() * strings.length);
    const tag = strings[randomIndex];
    const apiKey = quizApiKey;
    const url = "https://quizapi.io/api/v1/questions";
    const params = new URLSearchParams({
      apiKey: apiKey,
      limit: 10,
      tags: tag,
      difficulty: "easy",
    });

    const response = await fetch(url + "?" + params.toString());
    const questions = await response.json();

    return res.json(questions);
  } catch (err) {
    return res.json([`${err}`]);
  }
});

module.exports = router;
