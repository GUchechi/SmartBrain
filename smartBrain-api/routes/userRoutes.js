import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  imageEntry,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/image", protect, imageEntry);
router.route("/:userId").get(getUserProfile);

export default router;
