"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
}, {
    timestamps: true,
});
// Prevent duplicate product for same user
cartSchema.index({ userId: 1, productId: 1 }, { unique: true });
exports.CartModel = (0, mongoose_1.model)("Cart", cartSchema);
//# sourceMappingURL=cartModel.js.map