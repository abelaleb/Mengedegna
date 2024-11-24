const { Router } = require("express");

const LogEntry = require("../models/LogEntry");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    // Remove all entries from the LogEntry collection
    await LogEntry.deleteMany({});
    res.json({ message: "All entries have been deleted." });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newLogEntry = new LogEntry(req.body);

    // Save the new log entry to the database
    const createdEntry = await newLogEntry.save();

    // Respond with the newly created entry
    // res.json(createdEntry);
    return res.status(201).json(createdEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
