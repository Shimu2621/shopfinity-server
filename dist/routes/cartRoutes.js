"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
const router = (0, express_1.Router)();
router.post("/", cartController_1.createCart); // Create cart item
router.get("/user/:userId", cartController_1.getCart); // Get cart by user
router.get("/", cartController_1.getAllCartItems); // Get all cart items (admin)
router.patch("/:id", cartController_1.updateCartItem); // Update cart item
router.delete("/:id", cartController_1.deleteCartItem); // Delete cart item
exports.default = router;
//# sourceMappingURL=cartRoutes.js.map