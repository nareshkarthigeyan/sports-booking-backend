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
    const userID = new mongoose.Types.ObjectId(req.userID);
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

exports.getUserBookings = (req, res) => {
  try {
    const { userID } = req.params;
    const bookings = new Booking.find({ userID }).populate("groundId");

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).son({ error: "Server error" });
  }
};
