const mongoose = require("mongoose");
const { mongoURI: db} = require('../config/keys.js');
const User = require('../models/User');
const Card = require('../models/Card');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
    })
  )
}

//seed cards

const NUM_SEED_CARDS = 3;

const cards = [];

for (let i = 0; i < NUM_SEED_CARDS; i++) {
  const card = new Card({
    name: 'Card 1',
    rarity: 'Common',
    abilityType: 'Attack',
    abilityValue: 10,
    image: 'https://example.com/card1.png',
    owner: null  // Set owner to null as it will be associated with a player later
  });
  cards.push(card);
}

console.log(db)
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

  const insertSeeds = () => {
    console.log("Resetting db and seeding users...");
  
    User.collection.drop()
    .then(() => {
      return Card.collection.drop();
    })
      .then(() => User.insertMany(users))
      .then(() => Card.insertMany(cards))
      .then(() => {
        mongoose.disconnect();
      })
      .catch(err => {
        console.error(err.stack);
        process.exit(1);
      });
  };