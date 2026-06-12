"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Product name is required"),
        description: zod_1.z.string().min(1, "Description is required"),
        price: zod_1.z.number().positive("Price must be positive"),
        stock: zod_1.z.number().int().nonnegative("Stock cannot be negative"),
        images: zod_1.z.array(zod_1.z.string()).min(1, "At least one image is required"),
        featured: zod_1.z.boolean().optional(),
        isDiscountActive: zod_1.z.boolean().optional(),
        discountPercentage: zod_1.z.number().optional(),
        discountedPrice: zod_1.z.number().optional(),
        discountValidUntil: zod_1.z.string().datetime().optional(),
        categoryId: zod_1.z.string().optional(),
        brandId: zod_1.z.string().optional(),
    }),
});
exports.updateProductSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        stock: zod_1.z.number().optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        featured: zod_1.z.boolean().optional(),
        isDiscountActive: zod_1.z.boolean().optional(),
        discountPercentage: zod_1.z.number().optional(),
        discountedPrice: zod_1.z.number().optional(),
        discountValidUntil: zod_1.z.string().datetime().optional(),
        categoryId: zod_1.z.string().optional(),
        brandId: zod_1.z.string().optional(),
    })
        .strict(),
});
//# sourceMappingURL=product.validation.js.map