import { Request, Response } from "express";
import { CartModel } from "../models/cartModel";

/**
 * ➕ Create Cart Item
 */
export const createCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;

    const existingItem = await CartModel.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart item quantity updated",
        data: existingItem,
      });
    }

    const cartItem = await CartModel.create({
      userId,
      productId,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Cart item created successfully",
      data: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create cart item",
      error,
    });
  }
};

/**
 * 📥 Get Cart (By User)
 */
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const cartItems = await CartModel.find({ userId }).populate("productId");

    res.status(200).json({
      success: true,
      data: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error,
    });
  }
};

/**
 * 📦 Get All Cart Items (Admin)
 */
export const getAllCartItems = async (_req: Request, res: Response) => {
  try {
    const cartItems = await CartModel.find()
      .populate("userId")
      .populate("productId");

    res.status(200).json({
      success: true,
      total: cartItems.length,
      data: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all cart items",
      error,
    });
  }
};

/**
 * ✏️ Update Cart Item Quantity
 */
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updatedItem = await CartModel.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error,
    });
  }
};

/**
 * ❌ Delete Cart Item
 */
export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedItem = await CartModel.findByIdAndDelete(id);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete cart item",
      error,
    });
  }
};
