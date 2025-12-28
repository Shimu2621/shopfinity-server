import { Request, Response } from "express";
import { WishlistModel } from "../models/wishlistModel";
import { IWishlistQuery } from "../interfaces/wishlist.interface";

// Add to wishlist
export const createWishlist = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  const wishlist = await WishlistModel.create({
    userId,
    productId,
  });

  res.status(201).json({
    success: true,
    message: "Added to wishlist",
    data: wishlist,
  });
};

// Get user wishlist
export const getWishlist = async (req: Request, res: Response) => {
  const {
    userId,
    page = "1",
    limit = "10",
    searchTerm,
  } = req.query as IWishlistQuery;

  const skip = (Number(page) - 1) * Number(limit);

  // Build base filter
  const filters: any = {};
  if (userId) filters.userId = userId;

  // Fetch data with populated products
  let query = WishlistModel.find(filters)
    .populate("productId")
    .skip(skip)
    .limit(Number(limit));

  // If searchTerm exists, filter by product name
  if (searchTerm) {
    query = query.where("productId.name", new RegExp(searchTerm, "i"));
  }

  const data = await query;
  const total = await WishlistModel.countDocuments(filters);

  res.status(200).json({
    success: true,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data,
  });
};

// Get all wishlist items (Admin)
export const getAllWishlist = async (req: Request, res: Response) => {
  const { page = "1", limit = "10" } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const data = await WishlistModel.find()
    .populate("userId")
    .populate("productId")
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await WishlistModel.countDocuments();

  res.status(200).json({
    success: true,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data,
  });
};

// Remove from wishlist
export const deleteWishlistItem = async (req: Request, res: Response) => {
  const { userId, productId } = req.params;

  await WishlistModel.findOneAndDelete({ userId, productId });

  res.status(200).json({
    success: true,
    message: "Removed from wishlist",
  });
};
