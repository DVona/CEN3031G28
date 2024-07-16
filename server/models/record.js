import mongoose from "mongoose";

const recrodSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: "User",
  },
});

const Record = mongoose.model("Record", recrodSchema);

export default Record;
