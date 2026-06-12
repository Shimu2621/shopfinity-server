"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentSchema = exports.createPaymentSchema = void 0;
const zod_1 = require("zod");
exports.createPaymentSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    orderId: zod_1.z.string(),
    amount: zod_1.z.number().positive(),
    paymentMethod: zod_1.z.string(),
});
exports.updatePaymentSchema = zod_1.z.object({
    paymentStatus: zod_1.z.string(),
});
//# sourceMappingURL=payment.validation.js.map