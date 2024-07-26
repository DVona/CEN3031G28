import express from "express";
import { signup, signin, adminsignup } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/admin/signup", adminsignup);

export default router;
