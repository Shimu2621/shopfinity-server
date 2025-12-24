// routes/productAnswer.route.ts
import express from "express";
import {
  createProductAnswer,
  getAnswersByQuestion,
  updateProductAnswer,
  deleteProductAnswer,
} from "../controllers/productAnswerController";

const router = express.Router();

// Admin answers a question
router.post("/", createProductAnswer);

// Get answers for a specific question
router.get("/question/:questionId", getAnswersByQuestion);

// Update answer
router.put("/:id", updateProductAnswer);

// Delete answer
router.delete("/:id", deleteProductAnswer);

export default router;
