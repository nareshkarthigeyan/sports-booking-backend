const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne(decoded.userID);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    req.user = { userID: user._id, name: user.name };

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};
