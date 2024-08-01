import express from "express";
import multer from "multer";
import { signout, updateUser, deleteUser, getUsers, uploadIcon } from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ' - ' + file.originalname)
    },
    });
const upload = multer({storage: storage});

router.put("/update/:userId", verifyToken, updateUser);
router.post("/signout", signout);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/getusers", verifyToken, getUsers);
router.put("/upload-image/:userId", upload.single("image"), uploadIcon)

export default router;
