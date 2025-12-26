import { Router } from "express";
import {
  createCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  getAllCartItems,
} from "../controllers/cartController";

const router = Router();

router.post("/", createCart); // Create cart item
router.get("/user/:userId", getCart); // Get cart by user
router.get("/", getAllCartItems); // Get all cart items (admin)
router.patch("/:id", updateCartItem); // Update cart item
router.delete("/:id", deleteCartItem); // Delete cart item

export default router;
