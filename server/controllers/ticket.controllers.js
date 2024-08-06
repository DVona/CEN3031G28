import { errorhandler } from "../utils/error.js";
import Ticket from "../models/ticket.model.js";

export const create = async (req, res, next) => {
  if (!req.user) {
    return next(errorhandler(403, "You are not allowed to create a ticket"));
  }

  if (!req.body.category || !req.body.description) {
    return next(errorhandler(400, "Please provide all required fields"));
  }
  console.log(req.user);

  const newTicket = new Ticket({
    category: req.body.category,
    description: req.body.description,
    creatorId: req.user.id,
    creatorUsername: req.body.username,
  });

  try {
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    console.log("error");
    next(error);
  }
};
 
export const updateTicket = async (req, res, next) => {
  const ticketId = req.params.ticketId;
  const updatedData = req.body;

  // add role check later (dont allow users to update tickets)
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, updatedData, { new: true });

    res.status(200).json({
      message: "Ticket Updated Succesfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (req, res, next) => {
  if (!req.user.role === "Admin") {
    return next(errorhandler(403, "You are not allowed to delete this Ticket"));
  }
  try {
    await Ticket.findByIdAndDelete(req.params.ticketId);
    res.status(200).json("Ticket has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getTicket = async(req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);

    res.status(200).json({
      message: "Ticket Found",
      ticket,
    });
  } catch (error) {
    next(error);
  }
}


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

export const getTriageTickets = async (req, res, next) => {
  if (!req.user.role === "Admin" || !req.user.role === "Employee") {
    return next(errorhandler(403, "You are not allowed to retrieve ticket data"));
  }
  try {
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const triageTickets = await Ticket.find({ arbitration: true }).sort({ createdAt: sortDirection });

    res.status(200).json({
      tickets: triageTickets,
      totalTickets: triageTickets.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getOpenTickets = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const filter = { open: true };

    if (req.query.creatorId) {
      filter.creatorId = req.query.creatorId;
    } else if (req.query.assigneeId) {
      filter.assigneeId = req.query.assigneeId;
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 }).skip(startIndex).limit(limit);
    const totalTickets = await Ticket.countDocuments(filter);

    res.status(200).json({
      message: "retrieved open tickets",
      tickets,
      totalTickets,
    });
  } catch (error) {
    next(error);
  }
};

export const getClosedTickets = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const filter = { open: false };

    if (req.query.creatorId) {
      filter.creatorId = req.query.creatorId;
    } else if (req.query.assigneeId) {
      filter.assigneeId = req.query.assigneeId;
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 }).skip(startIndex).limit(limit);
    const totalTickets = await Ticket.countDocuments(filter);

    res.status(200).json({
      message: "retrieved closed tickets",
      tickets,
      totalTickets,
    });
  } catch (error) {
    next(error);
  }
};
