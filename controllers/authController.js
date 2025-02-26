const { User, UserValidationSchema } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.signup = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    UserValidationSchema.parse({ name, email, number, password });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      number,
      password: passwordHash,
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res
      .status(400)
      .json({ error: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
