// controllers/productAnswerController.ts
import { Request, Response } from "express";
import { ProductAnswerModel } from "../models/productAnswerModel";
import { productAnswerSchema } from "../validations/productAnswer.validation";

/**
 * ✅ Create Product Answer (Admin)
 * POST /api/product-answers
 */
export const createProductAnswer = async (req: Request, res: Response) => {
  try {
    const validatedData = productAnswerSchema.parse(req.body);

    const answer = await ProductAnswerModel.create(validatedData);

    return res.status(201).json({
      success: true,
      message: "Product answer created successfully",
      data: answer,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Get All Answers for a Question
 * GET /api/product-answers/question/:questionId
 */
export const getAnswersByQuestion = async (req: Request, res: Response) => {
  try {
    const answers = await ProductAnswerModel.find({
      questionId: req.params.questionId,
    })
      .populate("adminId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: answers.length,
      data: answers,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Update Product Answer
 * PUT /api/product-answers/:id
 */
export const updateProductAnswer = async (req: Request, res: Response) => {
  try {
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({
        success: false,
        message: "Answer text is required",
      });
    }

    const updated = await ProductAnswerModel.findByIdAndUpdate(
      req.params.id,
      { answer },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product answer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product answer updated successfully",
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Delete Product Answer
 * DELETE /api/product-answers/:id
 */
export const deleteProductAnswer = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductAnswerModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product answer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product answer deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
