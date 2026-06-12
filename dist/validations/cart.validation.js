"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartSchema = exports.createCartSchema = void 0;
const zod_1 = require("zod");
exports.createCartSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, "User ID is required"),
        productId: zod_1.z.string().min(1, "Product ID is required"),
        quantity: zod_1.z.number().int().min(1, "Quantity must be at least 1"),
    }),
});
exports.updateCartSchema = zod_1.z.object({
    body: zod_1.z.object({
        quantity: zod_1.z.number().int().min(1, "Quantity must be at least 1"),
    }),
});
//# sourceMappingURL=cart.validation.js.map