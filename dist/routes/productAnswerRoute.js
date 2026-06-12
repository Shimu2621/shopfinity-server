"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/productAnswer.route.ts
const express_1 = __importDefault(require("express"));
const productAnswerController_1 = require("../controllers/productAnswerController");
const router = express_1.default.Router();
// Admin answers a question
router.post("/", productAnswerController_1.createProductAnswer);
// Get answers for a specific question
router.get("/question/:questionId", productAnswerController_1.getAnswersByQuestion);
// Update answer
router.put("/:id", productAnswerController_1.updateProductAnswer);
// Delete answer
router.delete("/:id", productAnswerController_1.deleteProductAnswer);
exports.default = router;
//# sourceMappingURL=productAnswerRoute.js.map