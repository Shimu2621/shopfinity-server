import express from "express";
import {
  createProductQuestion,
  getAllProductQuestions,
  getSingleProductQuestion,
  updateProductQuestion,
  deleteProductQuestion,
} from "../controllers/productQuestionController";

const router = express.Router();

/**
 * Create Product Question
 * POST /api/product-questions
 */
router.post("/", createProductQuestion);

/**
 * Get All Product Questions
 * GET /api/product-questions
 */
router.get("/", getAllProductQuestions);

/**
 * Get Single Product Question
 * GET /api/product-questions/:id
 */
router.get("/:id", getSingleProductQuestion);

/**
 * Update Product Question
 * PUT /api/product-questions/:id
 */
router.put("/:id", updateProductQuestion);

/**
 * Delete Product Question
 * DELETE /api/product-questions/:id
 */
router.delete("/:id", deleteProductQuestion);

export default router;
