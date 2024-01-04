const express = require("express");
const bodyParser = require("body-parser");
const { pool } = require("./database_config/pool");
const cors = require("cors");

require("dotenv").config();

const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const port = process.env.SERVER_PORT;

// Middelware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/bookings',bookingRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/courts", async (req, res) => {
  try {
    const query = "SELECT court_id, court_name FROM courts";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get all courts");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get courts");
  }
});

app.get("/courts/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract court_id from the URL parameter
    const query = "SELECT court_id, court_name FROM courts WHERE court_id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send(`Court id ${id} not found`);
    }

    res.status(200).json(rows[0]);
    console.log(`Success: Get court by court_id ${id}`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get court by id");
  }
});

app.get("/members", async (req, res) => {
  try {
    const query =
      "SELECT member_id, first_name, last_name, email FROM members LIMIT 5";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get all members");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get members");
  }
});

app.get("/members/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract member_id from the URL parameter
    const query = "SELECT member_id, member_name FROM members WHERE member_id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send(`member id ${id} not found`);
    }

    res.status(200).json(rows[0]);
    console.log(`Success: Get member by member_id ${id}`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get member by id");
  }
});


app.get("/days-of-week", async (req, res) => {
  try {
    const query =
      "SELECT * FROM days_of_week";
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
    const query =
      "SELECT * FROM start_times";
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
    const query =
      "SELECT * FROM durations";
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
    const query =
      "SELECT * FROM booking_types";
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
