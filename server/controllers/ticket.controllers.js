import { errorhandler } from "../utils/error.js";
import Ticket from "../models/ticket.model.js";

export const create = async (req, res, next) => {
  if (!req.user) {
    return next(errorhandler(403, "You are not allowed to create a ticket"));
  }

  if (!req.body.category || !req.body.description) {
    return next(errorhandler(400, "Please provide all required fields"));
  }

  const newTicket = new Ticket({
    category: req.body.category,
    description: req.body.description,
    userId: req.user.id,
  });

  try {
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    console.log("error");
    next(error);
  }
};

// function handling getting all ticket data
export const getTickets = async (req, res, next) => {
  if (!req.user.role === "Admin") {
    return next(errorhandler(403, "You are not allowed to retrieve ticket data"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const tickets = await Ticket.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);
    const totalTickets = await Ticket.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const lastMonthTickets = await Ticket.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      tickets,
      totalTickets,
      lastMonthTickets,
    });
  } catch (error) {
    next(error);
  }
};
