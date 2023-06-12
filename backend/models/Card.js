const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rarity: {
        type: String,
        required: true
    },
    abilityType: {
        type: String,
        required: true
    },
    abilityValue: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Card', cardSchema);