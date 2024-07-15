import express from "express";
import connectDB from "../database/connection.js";
import Record from "../models/record.js";
import bcrypt from "bcryptjs";

const router = express.Router();
const saltTimes = 8;
// Get all records
router.get("/", async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).send(records);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving records");
  }
});

// Get a single record by id
router.get("/:id", async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(record);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving record");
  }
});

// Create a new record
router.post("/", async (req, res) => {
  // Hash function
  const hashedPassword = await bcrypt.hash(req.body.password, saltTimes);
  try {
    const newRecord = new Record({
      username: req.body.username,
      password: hashedPassword,
      level: req.body.level,
    });
    const savedRecord = await newRecord.save();
    res.status(201).send(savedRecord);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// Update a record by id
router.patch("/:id", async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        password: req.body.password,
        level: req.body.level,
      },
      { new: true }
    );
    if (!updatedRecord) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(updatedRecord);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Delete a record by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(deletedRecord);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
