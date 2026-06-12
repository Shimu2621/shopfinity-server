"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductQuestion = exports.updateProductQuestion = exports.getSingleProductQuestion = exports.getAllProductQuestions = exports.createProductQuestion = void 0;
const productQuestionModel_1 = require("../models/productQuestionModel");
const productQuestion_validation_1 = require("../validations/productQuestion.validation");
/**
 * ✅ Create Product Question
 * POST /api/product-questions
 */
const createProductQuestion = async (req, res) => {
    try {
        // Zod validation
        const validatedData = productQuestion_validation_1.productQuestionSchema.parse(req.body);
        const question = await productQuestionModel_1.ProductQuestionModel.create(validatedData);
        return res.status(201).json({
            success: true,
            message: "Product question created successfully",
            data: question,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createProductQuestion = createProductQuestion;
/**
 * ✅ Get All Product Questions
 * GET /api/product-questions
 */
const getAllProductQuestions = async (req, res) => {
    try {
        const questions = await productQuestionModel_1.ProductQuestionModel.find()
            .populate("userId", "name email")
            .populate("productId", "name price")
            .populate({
            path: "answer", // make sure you have virtual or ref
            model: "ProductAnswer",
        })
            .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: questions.length,
            data: questions,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAllProductQuestions = getAllProductQuestions;
/**
 * ✅ Get Single Product Question
 * GET /api/product-questions/:id
 */
const getSingleProductQuestion = async (req, res) => {
    try {
        const question = await productQuestionModel_1.ProductQuestionModel.findById(req.params.id)
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getSingleProductQuestion = getSingleProductQuestion;
/**
 * ✅ Update Product Question
 * PUT /api/product-questions/:id
 */
const updateProductQuestion = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question text is required",
            });
        }
        const updatedQuestion = await productQuestionModel_1.ProductQuestionModel.findByIdAndUpdate(req.params.id, { question }, { new: true });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateProductQuestion = updateProductQuestion;
/**
 * ✅ Delete Product Question
 * DELETE /api/product-questions/:id
 */
const deleteProductQuestion = async (req, res) => {
    try {
        const deletedQuestion = await productQuestionModel_1.ProductQuestionModel.findByIdAndDelete(req.params.id);
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteProductQuestion = deleteProductQuestion;
//# sourceMappingURL=productQuestionController.js.map