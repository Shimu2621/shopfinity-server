"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlistController_1 = require("../controllers/wishlistController");
const router = (0, express_1.Router)();
router.post("/", wishlistController_1.createWishlist);
router.get("/user", wishlistController_1.getWishlist); // user wishlist
router.get("/admin", wishlistController_1.getAllWishlist); // admin wishlist
router.delete("/:userId/:productId", wishlistController_1.deleteWishlistItem);
exports.default = router;
//# sourceMappingURL=wishlistRoutes.js.map