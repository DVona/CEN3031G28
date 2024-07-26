import express from "express";
import { signout, updateUser } from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.post("/signout", signout);

export default router;
