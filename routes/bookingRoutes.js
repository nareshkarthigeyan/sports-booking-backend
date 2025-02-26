const express = require("express");
const { Booking } = require("../models/Booking");
const {
  bookGround,
  getUserBookings,
} = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

// const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/bookings", authMiddleware, bookGround);
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    if (!bookings || bookings.length === 0) {
      console.log("No bookings found.");
      return res.status(404).json({ message: "No bookings found." });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Server error", err: error.message });
  }
});
router.get("/bookings/:userId", getUserBookings);

module.exports = router;
