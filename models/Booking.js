const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ground",
    required: true,
  },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
});

bookingSchema.index({ groundId: 1, date: 1, timeSlot: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
