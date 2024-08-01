import mongoose from "mongoose";

const ticketSchema2 = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    assigneeId: {
      type: String,
      required: true,
      default: "unassigned",
    },

    estimate: {
      type: String,
      required: true,
      default: "unknown",
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

const Ticket2 = mongoose.model("Ticket2", ticketSchema2);

export default Ticket2;