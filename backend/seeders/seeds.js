const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Card = require("../models/Card");
const Enemy = require("../models/Enemy.js");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const NUM_SEED_USERS = 10;

// Create users
const users = [];

users.push(
  new User({
    username: "deku",
    email: "demo@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
    gold: 100,
  })
);

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
      gold: 100,
    })
  );
}

const cards = [
  {
    name: "Carvey The Forbidden One",
    rarity: "SR",
    abilityType: "ability3",
    abilityValue: 30,
    imageUrl:
      "https://myappacademyheroes.s3.amazonaws.com/64889a7e1c99fc7930bd7a55.jpg",
  },
  {
    name: "Blue Eyes White Carvey",
    rarity: "SR",
    abilityType: "ability1",
    abilityValue: 10,
    imageUrl:
      "https://myappacademyheroes.s3.amazonaws.com/64889a7e1c99fc7930bd7a55.jpg",
  },
  {
    name: "Carvey The Tormentor",
    rarity: "SR",
    abilityType: "ability2",
    abilityValue: 20,
    imageUrl:
      "https://myappacademyheroes.s3.amazonaws.com/64889a7e1c99fc7930bd7a55.jpg",
  },
  {
    name: "Carvey The Sky Dragon",
    rarity: "SR",
    abilityType: "ability2",
    abilityValue: 20,
    imageUrl:
      "https://myappacademyheroes.s3.amazonaws.com/64889a7e1c99fc7930bd7a55.jpg",
  },
  {
    name: "The Wing Dragon of Carvey",
    rarity: "SR",
    abilityType: "ability2",
    abilityValue: 20,
    imageUrl:
      "https://myappacademyheroes.s3.amazonaws.com/64889a7e1c99fc7930bd7a55.jpg",
  },
  {
    name: "The Dark Carvey",
    rarity: "R",
    abilityType: "ability2",
    abilityValue: 20,
    imageUrl:
      "https://myappacademyheroes.s3.amazonaws.com/64889a7e1c99fc7930bd7a55.jpg",
  },
  {
    name: "Black Luster Carvey",
    rarity: "R",
    abilityType: "ability3",
    abilityValue: 30,
    imageUrl:
      "https://myappacademyheroes.s3.amazonaws.com/64889a7e1c99fc7930bd7a55.jpg",
  },
  {
    name: "Cyber Carvey",
    rarity: "N",
    abilityType: "ability3",
    abilityValue: 30,
    imageUrl:
      "https://myappacademyheroes.s3.amazonaws.com/64889a7e1c99fc7930bd7a55.jpg",
  },

  {
    name: "Summoned Carvey",
    rarity: "N",
    abilityType: "ability3",
    abilityValue: 30,
    imageUrl:
      "https://myappacademyheroes.s3.amazonaws.com/64889a7e1c99fc7930bd7a55.jpg",
  },

  {
    name: "Red Eye Black Carvey",
    rarity: "N",
    abilityType: "ability3",
    abilityValue: 30,
    imageUrl:
      "https://myappacademyheroes.s3.amazonaws.com/64889a7e1c99fc7930bd7a55.jpg",
  },
];

//seed enemies
const enemies = [];

const enemy1 = new Enemy({
  name: "Enemy 1",
  health: 100,
  attack: 10,
  imageUrl: "../assets/enemy1.png",
});
enemies.push(enemy1);

const enemy2 = new Enemy({
  name: "Enemy 2",
  health: 200,
  attack: 20,
  imageUrl: "../assets/enemy2.png",
});
enemies.push(enemy2);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    insertSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  console.log("Resetting db and seeding users...");

  User.collection
    .drop()
    .then(() => {
      return Card.collection.drop();
    })
    .then(() => {
      return Enemy.collection.drop();
    })
    .then(() => User.insertMany(users))
    .then(() => Card.insertMany(cards))
    .then(() => Enemy.insertMany(enemies))
    .then(() => {
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};

//dotenv node seeders/seeds.js
