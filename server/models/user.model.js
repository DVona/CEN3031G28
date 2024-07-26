import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "User",
      required: true,
    },
    tickets: {
      // Contains ticket ids associated with a user or assigned to an employee
      // In Progress
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
