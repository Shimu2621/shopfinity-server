"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWishlistSchema = void 0;
const zod_1 = require("zod");
exports.createWishlistSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().nonempty("User ID is required"),
        productId: zod_1.z.string().nonempty("Product ID is required"),
    }),
});
//# sourceMappingURL=wishlist.validation.js.map