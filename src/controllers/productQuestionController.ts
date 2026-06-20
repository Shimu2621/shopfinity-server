import { Request, Response } from "express";
import { ProductQuestionModel } from "../models/productQuestionModel";
import { productQuestionSchema } from "../validations/productQuestion.validation";

/**
 * ✅ Create Product Question
 * POST /api/product-questions
 */
export const createProductQuestion = async (req: Request, res: Response) => {
  try {
    // Zod validation
    const validatedData = productQuestionSchema.parse(req.body);

    const question = await ProductQuestionModel.create(validatedData);

    return res.status(201).json({
      success: true,
      message: "Product question created successfully",
      data: question,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Get All Product Questions
 * GET /api/product-questions
 */
export const getAllProductQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await ProductQuestionModel.find()
      .populate("userId", "name email")
      .populate("productId", "name price")
      .populate({
        path: "answer",
        model: "ProductAnswer",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Get Single Product Question
 *
 */
export const getSingleProductQuestion = async (req: Request, res: Response) => {
  try {
    const question = await ProductQuestionModel.findById(req.params.id)
      .populate("userId", "name email")
      .populate("productId", "name price");

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Product question not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Update Product Question
 * PUT /api/product-questions/:id
 */
export const updateProductQuestion = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question text is required",
      });
    }

    const updatedQuestion = await ProductQuestionModel.findByIdAndUpdate(
      req.params.id,
      { question },
      { new: true },
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Product question not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product question updated successfully",
      data: updatedQuestion,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Delete Product Question
 * DELETE /api/product-questions/:id
 */
export const deleteProductQuestion = async (req: Request, res: Response) => {
  try {
    const deletedQuestion = await ProductQuestionModel.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Product question not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product question deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
