import Event from "../models/event.model.js";
import Ticket from "../models/ticket.model.js";
import User from "../models/user.model.js";
import { errorhandler } from "../utils/error.js";

export const createEvent = async (req, res, next) => {
  const { ticketId, employeeId, start, end, title } = req.body;

  try {
    const ticket = await Ticket.findById(ticketId);
    const employee = await User.findById(employeeId);

    if (!ticket || !employee) {
      return res.status(404).json({ message: "Ticket or Employee not found" });
    }

    const event = new Event({
      ticketId,
      employeeId,
      start,
      end,
      title,
    });

    await event.save();
    res.status(201).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  const { ticketId, start, end, title } = req.body;

  try {
    let event = await Event.findOne({ ticketId });

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    event.start = start;
    event.end = end;
    event.title = title;

    await event.save();

    res.status(200).json({ 
      message: "Event Updated Successfully", 
      event,
     });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeEvents = async (req, res, next) => {
  if (req.user.id !== req.params.employeeId) {
    return next(errorhandler(403, "You are not allowed to view this calendar"));
  }
  try {
    const employeeId = req.user.id;
    const events = await Event.find({ employeeId }).sort({ start: 1 });
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};
