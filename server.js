const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const groundsRoutes = require("./routes/playGroundRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", bookingRoutes);
app.use("/api/grounds", groundsRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
