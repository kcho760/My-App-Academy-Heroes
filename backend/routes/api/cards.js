const mongoose = require('mongoose');
const Card = mongoose.model('Card');
const router = require('express').Router();
//index
router.get('/user/:userid', async (req, res) => {
    try {
      const cards = await Card.find();
      res.json(cards);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    }
  });
//show
router.get('/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
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
router.post('/cards', async (req, res) => {
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
router.delete('cards/:id', async (req, res) => {
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