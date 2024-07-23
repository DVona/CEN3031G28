/*
this.addCustomerChatLog(description);
}

isScheduled(){
    return this.estimate == 0;
}
getID(){
    return this.id;
}
getCategory(){
    return this.category;
}
getAsssignee(){
    return this.assignee;
}
getCustomer(){
    return this.customer;
}
getCompletionTime(){
    return this.estimate + this.schedule;
}
setEstimate(time){
    this.estimate = time;
}
setSchedule(date){
    this.estimate = date;
}
getChatLog(){
    return this.chatLog;
}
addCustomerChatLog(message){
    this.chatLog.push(message);
    this.chatSender.push(0);
}
addEmployeeChatLog(message){
    this.chatLog.push(message);
    this.chatSender.push(1);
}
*/
import express from "express";
import connectDB from "../database/connection.js";
import Ticket from "../models/ticketModel.js";
import TicketCount from "../models/ticketCountModel.js";
import process from "node:process";
const API_URL = process.env.VITE_API_URL || "http://localhost:5050";
const router = express.Router();

// Get ticket count
router.get("/ticketCount", async (req, res) => {
    try {
      const ticketCount = await TicketCount.find();
      res.status(200).send(ticketCount);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving ticket count");
    }
});

// Increment ticket count
router.patch("/ticketCountUp", async (req, res) => {
  try {
    const updatedTicket = await TicketCount.findByIdAndUpdate(
      req.params.id,
      {
        ticketCount: req.body.ticketCount + 1,
      },
      { new: true }
    );
    if (!updatedTicket) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(updatedTicket);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating ticket count");
  }
});

// Get all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).send(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving tickets");
  }
});

// Get a single ticket by id
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(ticket);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving ticket");
  }
});

// Create a new ticket
router.post("/form", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/tickets/ticketCountUp`);
    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
    const ticketCounter = await response.json();
    const newTicket = new Ticket({ 
      id: ticketCounter.ticketCount,
      category: req.body.category,
      estimate: req.body.estimate,
      schedule: req.body.schedule,
      assignee: req.body.assignee,
      customer: req.body.customer,
      active: 1,
    });
    
    const savedTicket = await newTicket.save();
    res.status(201).send(savedTicket);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding ticket");
  }
});

// Update a ticket by id
router.patch("/:id", async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        id: req.body.id,
        category: req.body.category,
        estimate: req.body.estimate,
        schedule: req.body.schedule,
        assignee: req.body.assignee,
        customer: req.body.customer,
        active: req.body.active,
      },
      { new: true }
    );
    if (!updatedTicket) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(updatedTicket);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating ticket");
  }
});

// Delete a ticket by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(deletedTicket);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting ticket");
  }
});

export default router;