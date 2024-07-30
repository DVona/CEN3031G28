import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  category: { // "AccountHelp" "RepairRequest" "BugReport" "SecurityIssue" "Other"
    type: String,
    required: true,
    default: "AccountHelp",
  },
  estimate: { // estimated time in minutes to complete ticket (once started)
    type: Number,
    default: "0",
  },
  schedule: { // date the ticket is scheduled for
    type: Date,
  },
  assignee: { // employee username
    type: String,
    default: "Unassigned",
  },
  customer: { // customer username
    type: String,
    required: true,
  },
  chatLog: { // log of messages using chatSender to determine who sent what
    type: [String],
  },
  chatSender: { // chatSender = 0 for employee messages and it = 1 for customer messages
    type: [Boolean],
  },
  active: { // if the ticket is open or closed
    type: String,
    required: true,
    default: "Open",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
