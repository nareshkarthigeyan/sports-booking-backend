const { Booking, BookingValidationSchema } = require("../models/Booking");
const mongoose = require("mongoose");

exports.bookGround = async (req, res) => {
  try {
    // console.log(req.user);

    console.log("Request User:", req.user);
    console.log("Request Body:", req.body);

    const { groundId, date, timeSlot } = req.body;

    console.log("Request received:", { groundId, date, timeSlot });

    if (!groundId || !date || !timeSlot) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const userID = new mongoose.Types.ObjectId(req.user.userID);
    const groundID = new mongoose.Types.ObjectId(groundId);

    console.log("sending for zod validation: ", {userID, groundID, date});
    BookingValidationSchema.parse({ user: userID.toString(), venue: groundID.toString(), date, timeSlot });

    const existingBooking = await Booking.findOne({
      venue: groundID,
      date,
      timeSlot,
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ error: "Ground already booked for this time slot" });
    }

    await Booking.create({
      user: userID,
      venue: groundID,
      date,
      timeSlot,
    });

    res.status(201).json({ message: "Ground booked successfully!" });
  } catch (error) {
    console.error("Booking error:", error); // Logs full error
    res.status(500).json({ error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    console.log("Request parameters:", req.params);
    const { userId } = req.params;
    const userID = new mongoose.Types.ObjectId(userId); 

    console.log("User ID:", userID);

    const bookings = await Booking.find({ user: userID }).populate("venue");

    if (!bookings || bookings.length === 0) {
      console.log("No bookings found for user:", userID);
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Server error", err: error.message });
  }
};
