"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productQuestionSchema = void 0;
const zod_1 = require("zod");
exports.productQuestionSchema = zod_1.z.object({
    question: zod_1.z.string().min(5, "Question must be at least 5 characters"),
    userId: zod_1.z.string(),
    productId: zod_1.z.string(),
});
//# sourceMappingURL=productQuestion.validation.js.map