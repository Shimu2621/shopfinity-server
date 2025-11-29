import express from "express";
import {
  createUser,
  loginUser,
  updateUser,
  getProfile,
  getAllUsers,
} from "../controllers/userController";
import validate from "../middleware/validateResource";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware";
import {
  createUserSchema,
  loginSchema,
  updateUserSchema,
} from "../validations/user.validation";
const router = express.Router();

// Public routes
router.post("/signup", validate(createUserSchema), createUser);
router.post("/signin", validate(loginSchema), loginUser);

// Protected routes
router.put(
  "/update/:id",
  validate(updateUserSchema),
  authMiddleware,
  updateUser
);
router.get("/profile/:id", authMiddleware, getProfile);

// Admin-only route
router.get("/all", authMiddleware, authorizeRoles("admin"), getAllUsers);

export default router;
