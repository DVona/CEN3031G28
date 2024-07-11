import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: "User",
  },
  tickets: { // Contains ticket ids associated with a user or assigned to an employee
    type: [String],
  }
});

const Record = mongoose.model("Record", recordSchema);

export default Record;
