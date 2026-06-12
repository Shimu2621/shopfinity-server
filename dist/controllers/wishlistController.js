"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlistItem = exports.getAllWishlist = exports.getWishlist = exports.createWishlist = void 0;
const wishlistModel_1 = require("../models/wishlistModel");
// Add to wishlist
const createWishlist = async (req, res) => {
    const { userId, productId } = req.body;
    const wishlist = await wishlistModel_1.WishlistModel.create({
        userId,
        productId,
    });
    res.status(201).json({
        success: true,
        message: "Added to wishlist",
        data: wishlist,
    });
};
exports.createWishlist = createWishlist;
// Get user wishlist
const getWishlist = async (req, res) => {
    const { userId, page = "1", limit = "10", searchTerm, } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    // Build base filter
    const filters = {};
    if (userId)
        filters.userId = userId;
    // Fetch data with populated products
    let query = wishlistModel_1.WishlistModel.find(filters)
        .populate("productId")
        .skip(skip)
        .limit(Number(limit));
    // If searchTerm exists, filter by product name
    if (searchTerm) {
        query = query.where("productId.name", new RegExp(searchTerm, "i"));
    }
    const data = await query;
    const total = await wishlistModel_1.WishlistModel.countDocuments(filters);
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
exports.getWishlist = getWishlist;
// Get all wishlist items (Admin)
const getAllWishlist = async (req, res) => {
    const { page = "1", limit = "10" } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const data = await wishlistModel_1.WishlistModel.find()
        .populate("userId")
        .populate("productId")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });
    const total = await wishlistModel_1.WishlistModel.countDocuments();
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
exports.getAllWishlist = getAllWishlist;
// Remove from wishlist
const deleteWishlistItem = async (req, res) => {
    const { userId, productId } = req.params;
    await wishlistModel_1.WishlistModel.findOneAndDelete({ userId, productId });
    res.status(200).json({
        success: true,
        message: "Removed from wishlist",
    });
};
exports.deleteWishlistItem = deleteWishlistItem;
//# sourceMappingURL=wishlistController.js.map