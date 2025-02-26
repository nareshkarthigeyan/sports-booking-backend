const PlayGround = require("../models/PlayGround");

exports.createGround = async (req, res) => {
  try {
    console.log("request body:", req.body);
    console.log("request user:", req.user);
    const { name, location, price, rating } = req.body;
    console.log("request received:", { name, location, price, rating });

    const sportsPlayed = req.body.sportsPlayed.split(",");
    const slots = req.body.slots.split(",");
    console.log("creating ground:", {
      name,
      location,
      sportsPlayed,
      slots,
      price,
      rating,
    });
    const newGround = await PlayGround.create({
      name,
      location,
      sportsPlayed,
      slots,
      price,
      rating,
    });
    console.log("new ground:", newGround);
    res
      .status(201)
      .json({ message: "Ground created successfully!", ground: newGround });
  } catch (error) {
    console.error("Error creating ground:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
