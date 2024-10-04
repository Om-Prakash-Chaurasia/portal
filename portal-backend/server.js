const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

// load environment variable
dotenv.config();

// connect to mongoDB
connectDB();

const app = express();

// middleware to handle JSON data
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => res.send("Welcome!"));

// define routes
app.use("/api/register", require("./routes/registrationRoute"));
app.use("/api/login", require("./routes/loginRoute"));
app.use("/api/courses", require("./routes/courseRoute"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
