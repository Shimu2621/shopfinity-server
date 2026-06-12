"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.getMyOrders = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const orderModel_1 = require("../models/orderModel");
const order_validation_1 = require("../validations/order.validation");
const createOrder = async (req, res) => {
    try {
        const validatedData = order_validation_1.orderSchema.parse(req.body);
        const newOrder = await orderModel_1.OrderModel.create(validatedData);
        return res.status(201).json({ message: "Order created", order: newOrder });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.createOrder = createOrder;
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel_1.OrderModel.find()
            .populate("items.productId", "name images price description") // ✅ populate
            .sort({ createdAt: -1 });
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (req, res) => {
    try {
        const order = await orderModel_1.OrderModel.findById(req.params.id).populate("items.productId", "name images price description"); // ✅ populate
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        res.status(200).json({ order });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOrderById = getOrderById;
const getMyOrders = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const orders = await orderModel_1.OrderModel.find({ userId: req.user.id })
            .populate("items.productId", "name images price description")
            .sort({ createdAt: -1 });
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};
exports.getMyOrders = getMyOrders;
const updateOrderStatus = async (req, res) => {
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
        const order = await orderModel_1.OrderModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        return res.status(200).json({ message: "Order updated", order });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const deleteOrder = async (req, res) => {
    try {
        const order = await orderModel_1.OrderModel.findByIdAndDelete(req.params.id);
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        return res.status(200).json({ message: "Order deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=orderController.js.map