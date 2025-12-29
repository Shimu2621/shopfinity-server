import express from "express";
import validate from "../middleware/validateResource";

import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";

import {
  createReviewSchema,
  updateReviewSchema,
} from "../validations/review.validation";

const router = express.Router();

// CREATE
router.post("/", validate(createReviewSchema), createReview);

// GET ALL
router.get("/", getAllReviews);

// GET SINGLE
router.get("/:id", getSingleReview);

// UPDATE
router.put("/:id", validate(updateReviewSchema), updateReview);

// DELETE
router.delete("/:id", deleteReview);

export default router;
