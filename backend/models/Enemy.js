const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const enemySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    attack: {
        type: Number,
        required: true
    },
    health: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Enemy', enemySchema);