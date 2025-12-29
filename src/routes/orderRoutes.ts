import express from "express";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getSingleOrder);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
