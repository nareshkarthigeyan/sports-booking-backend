const jwt = require("jsonwebtoken");
const {User, UserValidationSchema} = require("../models/User");
const mongoose = require("mongoose");
const { number } = require("joi");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    console.log(decoded.userId);
    // const userID = new mongoose.Types.ObjectId(decoded.userId);
    // console.log(userID);
    console.log("searching for user");
    console.log("Mongoose connection state:", mongoose.connection.readyState);

    // const users = await User.find({});
    // console.log("Users in DB:", users);

    const user = await User.findById(decoded.userId);
    console.log("user found:", user);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });s
    }

    req.user = { userID: user._id, name: user.name, email: user.email, number: user.phoneNo };
    console.log("found user: going inside next: ");
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Token", error: err });
  }
};
