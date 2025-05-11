const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");
const flightsRoutes = require("./routes/flightsRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// SQLite DB setup
const db = new sqlite3.Database(process.env.SQLITE_DB_PATH || './flights.db', (err) => {
  if (err) {
    console.error('Failed to connect to SQLite DB:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Make DB accessible in req
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use("/api/flights", flightsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
