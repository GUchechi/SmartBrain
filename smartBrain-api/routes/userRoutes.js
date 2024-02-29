import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  imageEntry,
  updateUserProfile, 
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.put("/image", imageEntry);
router
  .route("/:userId")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
