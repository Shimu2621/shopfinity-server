"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controllers/paymentController");
const stripeWebhookController_1 = require("../controllers/stripeWebhookController");
const router = express_1.default.Router();
router.post("/", paymentController_1.createPayment);
router.get("/", paymentController_1.getAllPayments);
router.get("/:id", paymentController_1.getSinglePayment);
router.patch("/:id", paymentController_1.updatePayment);
// ✅ Stripe session route
router.post("/create-stripe-session", paymentController_1.createStripeSession);
/* ⭐ NEW STRIPE WEBHOOK ROUTE */
router.post("/webhook", express_1.default.raw({ type: "application/json" }), stripeWebhookController_1.stripeWebhook);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map