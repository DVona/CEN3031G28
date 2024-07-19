import express from "express";
import Record from "../models/record.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Sign-up endpoint
router.post("/", async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Example: Validate input (username and password)
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Example: Check if the username already exists
    const existingUser = await Record.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user record
    const saltTimes = 8;
    const hashedPassword = await bcrypt.hash(password, saltTimes);
    const newUser = new Record({username, password: hashedPassword});
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

export default router;
