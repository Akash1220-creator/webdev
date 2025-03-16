import express from "express";
import {
  getAdmins,
  getMyProfile,
  login,
  logout,
  register,
} from "../controller/user.controller.js";

import { isAuthenticated } from "../middleware/authUser.js";
import { cloudinaryFileUploader } from "../middleware/fupload.js";

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: {
  fileSize: 10 * 1024 * 1024, // 5 MB file size limit
}, });

const router = express.Router();
router.post("/register",cloudinaryFileUploader.single('photo'), register);//upload.single("photo"), "photo" is field within the request object

router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.get("/admins", getAdmins);



export default router;