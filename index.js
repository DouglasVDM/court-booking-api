const express = require("express");
const bodyParser = require("body-parser");
const { pool } = require("./pool");

require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT;

// Middelware
app.use(express.json());
app.use(bodyParser.json());

// Routes
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

app.get("/bookings", async (req, res) => {
  try {
    const query =
      "SELECT booking_id, court_id, member_id, booked_at, booking_date, booking_start_at, booking_end_at FROM bookings LIMIT 5";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get all bookings");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get bookings");
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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
