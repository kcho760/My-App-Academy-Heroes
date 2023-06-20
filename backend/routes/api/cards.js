const fs = require("fs");
const mongoose = require("mongoose");
const Card = mongoose.model("Card");
const User = mongoose.model("User");
const router = require("express").Router();
const path = require("path");

const cardsDataPath = path.join(__dirname, "..", "..", "data", "cards.json");
// Read card data from cards.json
const cardsData = fs.readFileSync(cardsDataPath, "utf8");
const predefinedCards = JSON.parse(cardsData);

// Index route - Get all user's cards
router.get("/user/:userid", async (req, res) => {
  try {
    const userId = req.params.userid; // Extract the userid from the request parameters
    // Retrieve cards for the specified user
    const cards = await Card.find({ owner: userId });

    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Create route - Create a new card and assign it to a user
router.post("/", async (req, res) => {
  try {
    const rarityPullRates = {
      N: 60, // 60% chance
      R: 30, // 30% chance
      SR: 10, // 10% chance
    };

    const totalPullRate = Object.values(rarityPullRates).reduce(
      (sum, pullRate) => sum + pullRate,
      0
    );

    const randomPull = Math.random() * totalPullRate;

    let cumulativePullRate = 0;
    let selectedRarity = null;

    for (const rarity in rarityPullRates) {
      cumulativePullRate += rarityPullRates[rarity];
      if (randomPull <= cumulativePullRate) {
        selectedRarity = rarity;
        break;
      }
    }

    const filteredCards = predefinedCards.filter(
      (card) => card.rarity === selectedRarity
    );

    if (filteredCards.length === 0) {
      return res
        .status(404)
        .json({ error: "No cards available for the selected rarity" });
    }

    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    const randomCard = filteredCards[randomIndex];
    const newCard = new Card({
      ...randomCard,
      owner: req.body.user._id,
    });
    const user = await User.findById(req.body.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const savedCard = await newCard.save();
    user.gold -= 10;
    await user.save();

    res.json(savedCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const cardId = req.params.id;
    const update = req.body;
    const card = await Card.findByIdAndUpdate(cardId, update, { new: true });
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find({ owner: null });

    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});
// Delete route - Delete a card by ID
router.delete("/:id", async (req, res) => {
  const cardId = req.params.id
  try {
    const user = await User.findById(req.body.userId)
    user.gold += req.body.gold
    user.save()
    const result = await Card.deleteOne({ _id: cardId });
    res.json({ message: "Card deleted and gold refunded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { userId, cardsToDelete } = req.body;
    const result = await Card.deleteMany({ _id: { $in: cardsToDelete } });
    res.json({ message: "Cards deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
