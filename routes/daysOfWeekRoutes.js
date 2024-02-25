const express = require("express");
const { pool } = require("../database_config/pool");

const router = express.Router();

router.get("/", async (req, res) => {
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

module.exports = router;
