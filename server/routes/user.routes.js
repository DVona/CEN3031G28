import express from "express";
import { signout, updateUser, deleteUser, getUsers, uploadIcon} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.post("/signout", signout);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/getusers", verifyToken, getUsers);
router.post("/upload-image/:userId", verifyToken, uploadIcon)

export default router;
