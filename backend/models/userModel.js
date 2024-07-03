const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    uname: String,
    password: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", userDetailsSchema);

module.exports = User;