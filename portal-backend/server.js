const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const courseRoutes = require("./routes/course.route");
const userRoutes = require("./routes/user.route");

// loading environment variable
dotenv.config();

// Connect to DB
connectDB();

const app = express();
app.use(express.json()); // Middleware
app.use(cors({ origin: "http://localhost:5173" }));

// routes
app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is up and running on port ${PORT}`);
});
