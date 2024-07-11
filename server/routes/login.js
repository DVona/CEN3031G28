import express from "express";
import Record from "../models/record.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Login route
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const saltTimes = 8;
    const hashedPassword = await bcrypt.hash(password, saltTimes);
    const user = await Record.findOne({ username });
    if (user) { 
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log("Error comparing password", err);
          return;
        }
        if (result) {
          return res.status(200).json({ message: "Login successful", user });
        } else {
          return res.status(401).json({ message: "Invalid password" });
        }

      }); 
      } else {
      return res.status(401).json({ message: "Invalid username" });
    }
  } catch (error) {
    console.error("Error during login: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
