const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const Card = mongoose.model("Card");
const { loginUser, restoreUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const AWS = require("aws-sdk");
const FormData = require("form-data");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    message: "GET /api/users",
  });
});

router.post("/register", validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  if (user) {
    // Throw a 400 error if the email address and/or username already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
      } catch (err) {
        next(err);
      }
    });
  });

  const base64Image = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
  fs.writeFile("/tmp/output.jpg", base64Image, "base64", async function (err) {
    if (err) {
      console.log(err);
    } else {
      let form = new FormData();
      form.append("image", fs.createReadStream("/tmp/output.jpg"));
      form.append("type", "anime");

      const response = await fetch(
        "https://www.ailabapi.com/api/portrait/effects/portrait-animation",
        {
          method: "POST",
          headers: {
            "ailabapi-api-key": process.env.AILAB_API,
          },
          body: form,
        }
      );

      const jsonResponse = await response.json();
      const imageUrl = jsonResponse.data.image_url;

      // Fetch image from the URL given by the API
      const apiImageResponse = await fetch(imageUrl);
      const apiImageBuffer = await apiImageResponse.buffer();

      // Now upload this buffer to AWS S3.
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${newUser._id}.jpg`,
        Body: apiImageBuffer,
        ContentType: "image/jpeg",
      };

      s3.upload(params, async function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(`File uploaded successfully. ${data.Location}`);
          newUser.imageUrl = data.Location;
          await newUser.save();
          return res.json(await loginUser(newUser));
        }
      });
    }
  });
});

// POST /api/users/login
router.post("/login", validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
  })(req, res, next);
});

router.get("/current", restoreUser, async (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  
  try {
    const cards = await Card.find({ owner: req.user._id }).exec();
    return res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      imageUrl: req.user.imageUrl,
      health: req.user.health,
      gold: req.user.gold,
      ownedCards: cards,
    });
  } catch (err) {
    // Handle any errors that occur during the query execution
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.patch("/:id", async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    return next(err);
  }
  const cards = await Card.find({ owner: req.user._id }).exec();
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    imageUrl: req.user.imageUrl,
    health: req.user.health,
    gold: req.user.gold,
    ownedCards: cards,
  });
});

module.exports = router;