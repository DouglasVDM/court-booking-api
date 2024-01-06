const express = require("express");
const { pool } = require("../database_config/pool");

const router = express.Router();

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from the URL parameter
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

module.exports = router;
