const express = require("express");
const { pool } = require("../database_config/pool");

const router = express.Router();

router.get("/", async (req, res) => {
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

module.exports = router;
