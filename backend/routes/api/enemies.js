const mongoose = require('mongoose');
const Enemy = mongoose.model('Enemy');
const router = require('express').Router();

//show
router.get('/:id', async (req, res) => {
    try {
        const card = await Enemy.findById(req.params.id);
        if (!card) {
        return res.status(404).json({ error: 'Card not found' });
        }
        res.json(card);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

//Create
router.post('/enemies', async (req, res) => {
    try {
      const newCard = new Card(req.body);
      const savedCard = await newCard.save();
      res.json(savedCard);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    }
  });


// DELETE a card by ID
router.delete('enemies/:id', async (req, res) => {
    try {
      const card = await Card.findByIdAndDelete(req.params.id);
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