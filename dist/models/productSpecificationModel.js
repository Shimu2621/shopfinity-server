"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecificationModel = void 0;
const mongoose_1 = require("mongoose");
const productSpecificationSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
}, { timestamps: true });
exports.ProductSpecificationModel = (0, mongoose_1.model)("ProductSpecification", productSpecificationSchema);
//# sourceMappingURL=productSpecificationModel.js.map