import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getTickets } from "../controllers/ticket.controllers.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/gettickets", verifyToken, getTickets);

export default router;
