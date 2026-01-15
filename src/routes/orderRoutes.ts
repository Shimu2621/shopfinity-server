import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/orderController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
