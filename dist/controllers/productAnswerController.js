"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductAnswer = exports.updateProductAnswer = exports.getAnswersByQuestion = exports.createProductAnswer = void 0;
const productAnswerModel_1 = require("../models/productAnswerModel");
const productAnswer_validation_1 = require("../validations/productAnswer.validation");
/**
 * ✅ Create Product Answer (Admin)
 * POST /api/product-answers
 */
const createProductAnswer = async (req, res) => {
    try {
        const validatedData = productAnswer_validation_1.productAnswerSchema.parse(req.body);
        const answer = await productAnswerModel_1.ProductAnswerModel.create(validatedData);
        return res.status(201).json({
            success: true,
            message: "Product answer created successfully",
            data: answer,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createProductAnswer = createProductAnswer;
/**
 * ✅ Get All Answers for a Question
 * GET /api/product-answers/question/:questionId
 */
const getAnswersByQuestion = async (req, res) => {
    try {
        const answers = await productAnswerModel_1.ProductAnswerModel.find({
            questionId: req.params.questionId,
        })
            .populate("adminId", "name email")
            .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: answers.length,
            data: answers,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAnswersByQuestion = getAnswersByQuestion;
/**
 * ✅ Update Product Answer
 * PUT /api/product-answers/:id
 */
const updateProductAnswer = async (req, res) => {
    try {
        const { answer } = req.body;
        if (!answer) {
            return res.status(400).json({
                success: false,
                message: "Answer text is required",
            });
        }
        const updated = await productAnswerModel_1.ProductAnswerModel.findByIdAndUpdate(req.params.id, { answer }, { new: true });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateProductAnswer = updateProductAnswer;
/**
 * ✅ Delete Product Answer
 * DELETE /api/product-answers/:id
 */
const deleteProductAnswer = async (req, res) => {
    try {
        const deleted = await productAnswerModel_1.ProductAnswerModel.findByIdAndDelete(req.params.id);
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteProductAnswer = deleteProductAnswer;
//# sourceMappingURL=productAnswerController.js.map