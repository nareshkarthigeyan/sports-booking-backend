const mongoose = require("mongoose");

const { z } = require("zod");

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

const PlayGroundValidationSchema = z.object({
  name: z.string().nonempty(),
  location: z.string().nonempty(),
  sportsPlayed: z.array(z.string()).optional(),
  slots: z.array(z.string()).nonempty(),
  price: z.number().positive(),
  rating: z.number().min(0).max(5),
});

const Ground = mongoose.model("Ground", PlayGroundSchema);

module.exports = { Ground, PlayGroundValidationSchema };
