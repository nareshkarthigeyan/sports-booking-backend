const express = require("express");
const {
  bookGround,
  getUserBookings,
} = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

// const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/bookings", authMiddleware, bookGround);
router.get("/bookings/:userId", authMiddleware, getUserBookings);

module.exports = router;
