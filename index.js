const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const bookingRoutes = require("./routes/bookingRoutes");
const memberRoutes = require("./routes/memberRoutes");
const courtRoutes = require("./routes/courtRoutes");
const daysOfWeekRoutes = require("./routes/daysOfWeekRoutes");
const startTimeRoutes = require("./routes/startTimeRoutes");
const durationRoutes = require("./routes/durationRoutes");
const bookingTypeRoutes = require("./routes/bookingTypeRoutes");

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
app.use("/days-of-week", daysOfWeekRoutes);
app.use("/start-times", startTimeRoutes);
app.use("/durations", durationRoutes);
app.use("/booking-types", bookingTypeRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
