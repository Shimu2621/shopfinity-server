"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productQuestionController_1 = require("../controllers/productQuestionController");
const router = express_1.default.Router();
/**
 * Create Product Question
 * POST /api/product-questions
 */
router.post("/", productQuestionController_1.createProductQuestion);
/**
 * Get All Product Questions
 * GET /api/product-questions
 */
router.get("/", productQuestionController_1.getAllProductQuestions);
/**
 * Get Single Product Question
 * GET /api/product-questions/:id
 */
router.get("/:id", productQuestionController_1.getSingleProductQuestion);
/**
 * Update Product Question
 * PUT /api/product-questions/:id
 */
router.put("/:id", productQuestionController_1.updateProductQuestion);
/**
 * Delete Product Question
 * DELETE /api/product-questions/:id
 */
router.delete("/:id", productQuestionController_1.deleteProductQuestion);
exports.default = router;
//# sourceMappingURL=productQuestionRoutes.js.map