import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },

    creatorUsername: {
      type: String,
      required: true,
    },

    assigneeId: {
      type: String,
      required: true,
      default: "null",
    },

    assigneeUsername: {
      type: String,
      required: true,
      default: "Unassigned",
    },

    estimate: {
      type: String,
      required: true,
      default: "unknown",
    },

    hoursworked: {
      type: String,
      required: true,
      default: "not worked on",
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    open: {
      type: Boolean,
      required: true,
      default: true,
    },

    arbitration: {
      type: Boolean,
      requied: true,
      default: true,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
  