const express = require("express");
const { pool } = require("../database_config/pool");

const router = express.Router();

// GET route for retrieving all bookings
router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT * FROM bookings LIMIT 5";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get all bookings");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get bookings");
  }
});

// POST route for creating bookings
router.post("/", async (req, res) => {
  try {
    const {
      court_id,
      member_id,
      day_name,
      start_time,
      duration_hours,
      booking_type_name,
    } = req.body;

    const query = `
        INSERT INTO bookings (court_id, member_id, day_name, start_time, duration_hours, booking_type_name)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;

    const values = [
      court_id,
      member_id,
      day_name,
      start_time,
      duration_hours,
      booking_type_name,
    ];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
    console.log("Success: Booking created");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not create booking");
  }
});

module.exports = router;
