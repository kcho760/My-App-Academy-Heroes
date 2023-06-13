const fs = require('fs');
const mongoose = require('mongoose');
const Card = mongoose.model('Card');
const router = require('express').Router();
const path = require('path');

const cardsDataPath = path.join(__dirname, '..', '..', 'data', 'cards.json');
// Read card data from cards.json
const cardsData = fs.readFileSync(cardsDataPath, 'utf8');
const predefinedCards = JSON.parse(cardsData);

// Index route - Get all cards
router.get('/user/:userid', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create route - Create a new card and assign it to a user
router.post('/', async (req, res) => {
  try {
    const rarityPullRates = {
      common: 60,    // 60% chance
      uncommon: 30,  // 30% chance
      rare: 10      // 10% chance
    };

    const totalPullRate = Object.values(rarityPullRates).reduce((sum, pullRate) => sum + pullRate, 0);

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

    const filteredCards = predefinedCards.filter(card => card.rarity === selectedRarity);

    if (filteredCards.length === 0) {
      return res.status(404).json({ error: 'No cards available for the selected rarity' });
    }

    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    const randomCard = filteredCards[randomIndex];

    const newCard = new Card({
      ...randomCard,
      owner: req.body.userId,
    });

    const savedCard = await newCard.save();

    res.json(savedCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Delete route - Delete a card by ID
router.delete('/:id', async (req, res) => {
  try {
    const cardId = req.params.id;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json({ message: 'Card deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
