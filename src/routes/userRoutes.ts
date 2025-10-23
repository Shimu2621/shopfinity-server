import express from "express";
import {
  createUser,
  loginUser,
  updateUser,
  getProfile,
  getAllUsers,
} from "../controllers/userController";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware";
const router = express.Router();

// Public routes
router.post("/signup", createUser);
router.post("/signin", loginUser);

// Protected routes
router.put("/update/:id", authMiddleware, updateUser);
router.get("/profile/:id", authMiddleware, getProfile);

// Admin-only route
router.get("/all", authMiddleware, authorizeRoles("admin"), getAllUsers);

export default router;
