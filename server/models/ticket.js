import mongoose from "mongoose";

const recrodSchema = new mongoose.Schema({
  issue: {
    type: "String",
    required: true,
  },
  decription:{
    type: "String",
    required: true,
  },
  importance:{
    type: "String",
    required: true,
  }
});

const Record = mongoose.model("Record", recrodSchema);

export default Record;
