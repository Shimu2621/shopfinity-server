"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSpecificationBulkSchema = exports.productSpecificationSchema = void 0;
const zod_1 = require("zod");
exports.productSpecificationSchema = zod_1.z.object({
    key: zod_1.z.string().min(1, "Key is required"),
    value: zod_1.z.string().min(1, "Value is required"),
    productId: zod_1.z.string().min(1, "Product ID is required"),
});
exports.productSpecificationBulkSchema = zod_1.z.array(exports.productSpecificationSchema);
//# sourceMappingURL=productSpecification.validation.js.map