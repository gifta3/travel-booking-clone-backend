require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./Config/db");
const userRoutes = require("./Router/User_routes");
const bookingRoutes = require("./Router/Booking_routes");

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Database Connection
// Routes
app.use("/api/user", userRoutes);
app.use("/api", bookingRoutes);
app.use("/api", bookingRoutes);
// Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});