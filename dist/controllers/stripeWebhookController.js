"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = void 0;
const stripe_1 = __importDefault(require("stripe"));
const paymentModel_1 = require("../models/paymentModel");
const orderModel_1 = require("../models/orderModel");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    /* ⭐ PAYMENT SUCCESS EVENT */
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const paymentId = session.metadata?.paymentId;
        if (!paymentId)
            return res.json({ received: true });
        const payment = await paymentModel_1.PaymentModel.findByIdAndUpdate(paymentId, {
            paymentStatus: "paid",
        });
        if (payment) {
            await orderModel_1.OrderModel.findByIdAndUpdate(payment.orderId, {
                status: "processing",
                paymentStatus: "paid",
            });
        }
    }
    res.json({ received: true });
};
exports.stripeWebhook = stripeWebhook;
//# sourceMappingURL=stripeWebhookController.js.map