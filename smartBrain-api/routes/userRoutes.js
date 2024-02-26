import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  imageEntry,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/image", imageEntry);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
