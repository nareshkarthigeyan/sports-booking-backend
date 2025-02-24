const mongoose = require("mongoose");

const PlayGroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  sportsPlayed: {
    type: [String],
    required: true,
  },
  slots: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Ground = mongoose.model("Ground", PlayGroundSchema);
module.exports = Ground;