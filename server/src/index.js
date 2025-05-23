const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");

const app = express();
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Mongoose server has started");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Middleware
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/api/logs", logs);
// Not Found Middleware
app.use(middlewares.notFound);

// Error Handling Middleware
app.use(middlewares.errorHandler);

// Start Server
const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
