import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deleteTicket, getClosedTickets, getOpenTickets, getTickets, getTriageTickets, updateTicket, getTicket } from "../controllers/ticket.controllers.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.put("/update/:ticketId", verifyToken, updateTicket);
router.get("/get/:ticketId", verifyToken, getTicket);
router.get("/gettickets", verifyToken, getTickets);
router.get("/gettriagetickets", verifyToken, getTriageTickets);
router.get("/getopentickets", verifyToken, getOpenTickets);
router.get("/getclosedtickets", verifyToken, getClosedTickets);
router.delete("/delete/:ticketId", verifyToken, deleteTicket);

export default router;
