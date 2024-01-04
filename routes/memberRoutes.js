const express = require("express");
const { pool } = require("../database_config/pool");

const router = express.Router();

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract member_id from the URL parameter
    const query =
      "SELECT member_id, member_name FROM members WHERE member_id = $1";
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

module.exports = router;
