const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    imageUrl: {
      // This field stores the URL of the image in S3
      type: String,
      required: false, // This can be false if the image is not mandatory
    },
    health: {
      type: Number,
      default: 100,
      required: true,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card"
      }
    ],
    gold: {
      type: Number,
      default: 100,
      required: true
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
