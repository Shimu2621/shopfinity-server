"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItem = exports.updateCartItem = exports.getAllCartItems = exports.getCart = exports.createCart = void 0;
const cartModel_1 = require("../models/cartModel");
/**
 * ➕ Create Cart Item
 */
const createCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const existingItem = await cartModel_1.CartModel.findOne({ userId, productId });
        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.status(200).json({
                success: true,
                message: "Cart item quantity updated",
                data: existingItem,
            });
        }
        const cartItem = await cartModel_1.CartModel.create({
            userId,
            productId,
            quantity,
        });
        res.status(201).json({
            success: true,
            message: "Cart item created successfully",
            data: cartItem,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create cart item",
            error,
        });
    }
};
exports.createCart = createCart;
/**
 * 📥 Get Cart (By User)
 */
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartItems = await cartModel_1.CartModel.find({ userId }).populate("productId");
        res.status(200).json({
            success: true,
            data: cartItems,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch cart",
            error,
        });
    }
};
exports.getCart = getCart;
/**
 * 📦 Get All Cart Items (Admin)
 */
const getAllCartItems = async (_req, res) => {
    try {
        const cartItems = await cartModel_1.CartModel.find()
            .populate("userId")
            .populate("productId");
        res.status(200).json({
            success: true,
            total: cartItems.length,
            data: cartItems,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch all cart items",
            error,
        });
    }
};
exports.getAllCartItems = getAllCartItems;
/**
 * ✏️ Update Cart Item Quantity
 */
const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updatedItem = await cartModel_1.CartModel.findByIdAndUpdate(id, { quantity }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Cart item updated successfully",
            data: updatedItem,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update cart item",
            error,
        });
    }
};
exports.updateCartItem = updateCartItem;
/**
 * ❌ Delete Cart Item
 */
const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await cartModel_1.CartModel.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Cart item deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete cart item",
            error,
        });
    }
};
exports.deleteCartItem = deleteCartItem;
//# sourceMappingURL=cartController.js.map