const express = require("express");
const router = express.Router();
const { quizApiKey } = require("../../config/keys");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


// VERSION 1 - separate requests
// router.get("/", async (req, res) => {
//   try {
//     const apiKey = quizApiKey;
//     const url = "https://quizapi.io/api/v1/questions";
//     const strings = ["javascript", "html", "mysql"]; // tags to pull from
//     const randomIndex = (array) => Math.floor(Math.random() * array.length);
//     // can set tag to use random from above, or can use coding category
//     // or dont give category or tag at all

//     // random 5 - set 1
//     const rIdx1 = randomIndex(strings);
//     const tag1 = strings[rIdx1];
//     const params1 = new URLSearchParams({
//       apiKey: apiKey,
//       limit: 5,
//       tags: tag1,
//       difficulty: "easy",
//     });
//     const response1 = await fetch(url + "?" + params1.toString());
//     const questions1 = await response1.json();

//     // random 5 - set 2
//     const rIdx2 = randomIndex(strings);
//     const tag2 = strings[rIdx2];
//     const params2 = new URLSearchParams({
//       apiKey: apiKey,
//       limit: 5,
//       tags: tag2,
//       difficulty: "easy",
//     });
//     const response2 = await fetch(url + "?" + params2.toString());
//     const questions2 = await response2.json();

//     // random 5 - set 3
//     const rIdx3 = randomIndex(strings);
//     const tag3 = strings[rIdx3];
//     const params3 = new URLSearchParams({
//       apiKey: apiKey,
//       limit: 5,
//       tags: tag3,
//       difficulty: "easy",
//     });
//     const response3 = await fetch(url + "?" + params3.toString());
//     const questions3 = await response3.json();

//     const questions= questions1.concat(questions2).concat(questions3)

//     return res.json(questions);
//   } catch (err) {
//     return res.json([`${err}`]);
//   }
// });

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
      questions.push(...data);
    }

    return res.json(questions);
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
