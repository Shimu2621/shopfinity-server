"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = exports.orderItemSchema = void 0;
const zod_1 = require("zod");
exports.orderItemSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number().min(1),
    price: zod_1.z.number().min(0),
});
exports.orderSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    items: zod_1.z.array(exports.orderItemSchema),
    totalAmount: zod_1.z.number().min(0),
    status: zod_1.z
        .enum(["pending", "processing", "shipped", "delivered", "cancelled"])
        .default("pending"),
});
//# sourceMappingURL=order.validation.js.map