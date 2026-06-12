"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", orderController_1.createOrder);
router.get("/", orderController_1.getAllOrders);
router.get("/my-orders", authMiddleware_1.authMiddleware, orderController_1.getMyOrders);
router.get("/:id", orderController_1.getOrderById);
router.put("/:id", orderController_1.updateOrderStatus);
router.delete("/:id", orderController_1.deleteOrder);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map