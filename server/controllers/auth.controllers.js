import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorhandler } from "../utils/error.js";

// signup function for users (will overcomment to help understand)
export const signup = async (req, res, next) => {
  // forms the body of the request into data we will use
  const { username, password } = req.body;

  // error catch if fields are empty/basecase
  if (!username || !password || username === "" || password === "") {
    next(errorhandler(400, "All fields are required"));
  }

  // creating a hashed password with bcrypt for storage
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  // try/catch to save user into our database
  try {
    // tries to save user into database using mongoose
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    // this is the error that exposes database info if shown to user
    // will usually throw error when usernames are repeated (username has unique tag)
    // next function passes the error along to our server to solve (simplifies handling)
    next(error);
  }
};

// signup function for admins
export const adminsignup = async (req, res, next) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role || username === "" || password === "" || role === "") {
    next(errorhandler(400, "All fields are required"));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });

  try {
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

// signin function for users
export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password || username === "" || password === "") {
    next(errorhandler(400, "All fields are required"));
  }

  try {
    // error messages the same to prevent user from knowing if one is correct/in the database
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(errorhandler(404, "Username or Password Incorrect"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorhandler(400, "Username or Password Incorrect"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
