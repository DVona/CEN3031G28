import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createEvent, getEmployeeEvents, updateEvent } from "../controllers/event.controllers.js"


const router = express.Router();

router.post("/create", createEvent);
router.put("/update", updateEvent);
router.get("/get/:employeeId", verifyToken,getEmployeeEvents);

export default router;
