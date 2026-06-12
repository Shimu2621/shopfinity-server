"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFilterOptionSchema = exports.createFilterOptionSchema = void 0;
const zod_1 = require("zod");
exports.createFilterOptionSchema = zod_1.z.object({
    name: zod_1.z.string(),
    type: zod_1.z.enum(["select", "range", "checkbox"]),
    options: zod_1.z.array(zod_1.z.string()).optional(),
    unit: zod_1.z.string().optional(),
    categoryId: zod_1.z.string(),
});
exports.updateFilterOptionSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    type: zod_1.z.enum(["select", "range", "checkbox"]).optional(),
    options: zod_1.z.array(zod_1.z.string()).optional(),
    unit: zod_1.z.string().optional(),
});
//# sourceMappingURL=filterOption.validation.js.map