import { Request, Response } from "express";
import { OrderModel } from "../models/orderModel";
import { orderSchema } from "../validations/order.validation";
import { AuthRequest } from "../middleware/authMiddleware";

// Create Order Controller
export const createOrder = async (req: Request, res: Response) => {
  try {
    const validatedData = orderSchema.parse(req.body);
    const newOrder = await OrderModel.create(validatedData);
    return res.status(201).json({ message: "Order created", order: newOrder });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Get All Orders Controller
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find()
      .populate("items.productId", "name images price description") // ✅ populate
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Get Order By ID Controller
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "items.productId",
      "name images price description",
    ); // ✅ populate

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ order });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Orders Controller
export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await OrderModel.find({ userId: req.user.id })
      .populate("items.productId", "name images price description")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Update Order Status Controller
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const allowed = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ message: "Order updated", order });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Order Controller
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ message: "Order deleted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
