"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productAnswerSchema = void 0;
// validations/productAnswer.validation.ts
const zod_1 = require("zod");
exports.productAnswerSchema = zod_1.z.object({
    answer: zod_1.z.string().min(1, "Answer is required"),
    questionId: zod_1.z.string().min(1, "Question ID is required"),
    adminId: zod_1.z.string().min(1, "Admin ID is required"),
});
//# sourceMappingURL=productAnswer.validation.js.map