"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getSingleReview = exports.getAllReviews = exports.createReview = void 0;
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
// CREATE REVIEW
const createReview = async (req, res) => {
    try {
        const review = await reviewModel_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createReview = createReview;
// GET ALL REVIEWS
const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel_1.default.find()
            .populate("userId", "name")
            .populate("productId", "name");
        // 🔥 Transform DB shape → Frontend shape
        const formattedReviews = reviews.map((r) => ({
            id: r._id.toString(),
            rating: r.rating,
            comment: r.comment,
            createdAt: r.createdAt,
            user: {
                name: r.userId?.name || "Unknown User",
            },
            product: {
                name: r.productId?.name || "Unknown Product",
            },
        }));
        res.status(200).json({
            success: true,
            data: formattedReviews,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getAllReviews = getAllReviews;
// GET SINGLE REVIEW
const getSingleReview = async (req, res) => {
    try {
        const review = await reviewModel_1.default.findById(req.params.id);
        if (!review)
            return res
                .status(404)
                .json({ success: false, message: "Review not found" });
        res.status(200).json({ success: true, data: review });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getSingleReview = getSingleReview;
// UPDATE REVIEW
const updateReview = async (req, res) => {
    try {
        const updated = await reviewModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updated)
            return res
                .status(404)
                .json({ success: false, message: "Review not found" });
        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateReview = updateReview;
// DELETE REVIEW
const deleteReview = async (req, res) => {
    try {
        const removed = await reviewModel_1.default.findByIdAndDelete(req.params.id);
        if (!removed)
            return res
                .status(404)
                .json({ success: false, message: "Review not found" });
        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteReview = deleteReview;
//# sourceMappingURL=reviewController.js.map