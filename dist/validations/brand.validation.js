"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrandSchema = exports.getSingleBrandSchema = exports.updateBrandSchema = exports.createBrandSchema = void 0;
const zod_1 = require("zod");
exports.createBrandSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Brand name is required"),
        categoryIds: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.updateBrandSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        categoryIds: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.getSingleBrandSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
});
exports.deleteBrandSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
});
//# sourceMappingURL=brand.validation.js.map