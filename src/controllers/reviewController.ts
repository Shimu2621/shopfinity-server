import { Request, Response } from "express";
import Review from "../models/reviewModel";

// CREATE REVIEW
export const createReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL REVIEWS
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "name")
      .populate("productId", "name");

    // 🔥 Transform DB shape → Frontend shape
    const formattedReviews = reviews.map((r: any) => ({
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
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE REVIEW
export const getSingleReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({});

    res.status(200).json({ success: true, data: review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE REVIEW
export const updateReview = async (req: Request, res: Response) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, {
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
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE REVIEW
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const removed = await Review.findByIdAndDelete(req.params.id);

    if (!removed)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
