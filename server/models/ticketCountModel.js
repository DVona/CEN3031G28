import mongoose from "mongoose";

const ticketCountSchema = new mongoose.Schema({
  ticketCount: {
    type: Number,
  },
});

const TicketCount = mongoose.model("TicketCount", ticketCountSchema);

export default TicketCount;
