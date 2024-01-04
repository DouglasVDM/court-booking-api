const express = require("express");
const bodyParser = require("body-parser");
const { pool } = require("./database_config/pool");
const cors = require("cors");

require("dotenv").config();

const bookingRoutes = require("./routes/bookingRoutes");
const memberRoutes = require("./routes/memberRoutes");
const courtRoutes = require("./routes/courtRoutes");

const app = express();
const port = process.env.SERVER_PORT;

// Middelware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/bookings", bookingRoutes);
app.use("/members", memberRoutes);
app.use("/courts", courtRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/days-of-week", async (req, res) => {
  try {
    const query = "SELECT * FROM days_of_week";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get all days of week");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get days of week");
  }
});

app.get("/start-times", async (req, res) => {
  try {
    const query = "SELECT * FROM start_times";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get start times");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get start times");
  }
});

app.get("/durations", async (req, res) => {
  try {
    const query = "SELECT * FROM durations";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get durations");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get durations");
  }
});

app.get("/booking-types", async (req, res) => {
  try {
    const query = "SELECT * FROM booking_types";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get booking_types");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get booking_types");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
