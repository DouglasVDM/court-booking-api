const express = require("express");
const { pool } = require("../database_config/pool");

const router = express.Router();

// GET route for retrieving all bookings
router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT booking_id, court_name, member_id, TO_CHAR(booked_at, 'HH:MI DD Month YYYY') AS formatted_booked_at, day_name, TO_CHAR(start_time, 'HH:MM') AS formatted_start_time, duration_hours, booking_type_name FROM bookings";

    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get all bookings");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get bookings");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from the URL parameter

    const query =
      "SELECT booking_id, court_name, member_id, TO_CHAR(booked_at, 'HH:MI DD Month YYYY') AS formatted_booked_at, day_name, TO_CHAR(start_time, 'HH:MM') AS formatted_start_time, duration_hours, booking_type_name FROM bookings WHERE booking_id=$1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send(`Booking id ${id} not found`);
    }

    res.status(200).json(rows[0]);
    console.log(`Success: Get booking by id ${id}`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed! Server error, could not get booking by id");
  }
});

// POST route for creating bookings
router.post("/", async (req, res) => {
  try {
    const {
      court_name,
      member_id,
      day_name,
      start_time,
      duration_hours,
      booking_type_name,
    } = req.body;

    const query = `
        INSERT INTO bookings (court_name, member_id, day_name, start_time, duration_hours, booking_type_name)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;

    const values = [
      court_name,
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
