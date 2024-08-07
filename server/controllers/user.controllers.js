import bcrypt from "bcryptjs";
import { errorhandler } from "../utils/error.js";
import User from "../models/user.model.js";

// function handing updating user info
// adapted from: https://github.com/sahandghavidel/mern-blog/tree/main
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  if (req.body.password) {
    if (req.body.password.length < 5) {
      return next(errorhandler(400, "Password must be at least 5 characters"));
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 20) {
      return next(errorhandler(400, "Username must be between 5 and 20 characters"));
    }
    if (req.body.username.includes(" ")) {
      return next(errorhandler(400, "Username cannot contain spaces"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, "Username can only contain letters and numbers"));
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};

// function handling user signout
// adapted from: https://github.com/sahandghavidel/mern-blog/tree/main
export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

// function handling deleting users
export const deleteUser = async (req, res, next) => {
  // readd user "userdeletion" later
  if (!req.user.role === "Admin") {
    return next(errorhandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

// function handling getting all user data
export const getUsers = async (req, res, next) => {
  if (!req.user.role === "Admin") {
    return next(errorhandler(403, "You are not allowed to retrieve users data"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployees = async (req, res, next) => {
  if (!req.user.role === "Admin") {
    return next(errorhandler(403, "You are not allowed to retrieve employee data"));
  }
  try {
    const employees = await User.find({ role: "Employee" });

    const employeesWithoutPassword = employees.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    res.status(200).json({
      message: "retrieved employee data",
      employees: employeesWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadIcon = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          icon: req.body.image,
        },
      },
      { new: true }
    );
    const { image, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
