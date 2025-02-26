const mongoose = require("mongoose");
const { z } = require("zod");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserValidationSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phoneNo: z.number().optional(),
  password: z.string().min(6),
});

module.exports = {
  User: mongoose.model("User", UserSchema),
  UserValidationSchema,
};
