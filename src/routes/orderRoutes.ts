import express from "express";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/all-orders", getAllOrders);
router.get("/:id", getSingleOrder);
router.put("/update-status/:id", updateOrderStatus);
router.delete("/delete-order/:id", deleteOrder);

export default router;
