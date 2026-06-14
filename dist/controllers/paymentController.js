"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePayment = exports.getSinglePayment = exports.getAllPayments = exports.stripeWebhook = exports.createStripeSession = exports.createPayment = void 0;
const paymentModel_1 = require("../models/paymentModel");
const stripe_1 = __importDefault(require("stripe"));
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is missing");
}
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
/**
 * ➕ Create Payment
 */
const createPayment = async (req, res) => {
    try {
        const { userId, orderId, amount, paymentMethod } = req.body;
        const payment = await paymentModel_1.PaymentModel.create({
            userId,
            orderId,
            amount,
            paymentMethod,
            paymentStatus: "pending",
        });
        res.status(201).json({
            success: true,
            message: "Payment created",
            data: payment,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create payment",
            error,
        });
    }
};
exports.createPayment = createPayment;
/**
 * 🛒 Create Stripe Checkout Session
 */
const createStripeSession = async (req, res) => {
    try {
        const { paymentId } = req.body;
        const payment = await paymentModel_1.PaymentModel.findById(paymentId).populate("orderId");
        if (!payment)
            return res.status(404).json({ message: "Payment not found" });
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            metadata: {
                paymentId: payment._id.toString(), // VERY IMPORTANT FOR WEBHOOK
            },
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Order #${payment.orderId._id}`,
                        },
                        unit_amount: Math.round(payment.amount * 100),
                    },
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:3000/payment/success?paymentId=${payment._id}`,
            cancel_url: `http://localhost:3000/payment/cancel?paymentId=${payment._id}`,
        });
        res.status(200).json({ url: session.url });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create Stripe session", error });
    }
};
exports.createStripeSession = createStripeSession;
/**
 * 🛒 Create stripeWebhook
 */
const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        console.log("Webhook error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // IMPORTANT PART
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const paymentId = session.metadata?.paymentId;
        if (paymentId) {
            await paymentModel_1.PaymentModel.findByIdAndUpdate(paymentId, {
                paymentStatus: "paid",
            });
            console.log("✅ Payment marked as PAID");
        }
    }
    res.json({ received: true });
};
exports.stripeWebhook = stripeWebhook;
/**
 * 📦 Get All Payments (Admin)
 */
const getAllPayments = async (_req, res) => {
    try {
        const payments = await paymentModel_1.PaymentModel.find()
            .populate("userId")
            .populate("orderId");
        res.status(200).json({
            success: true,
            total: payments.length,
            data: payments,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch payments",
            error,
        });
    }
};
exports.getAllPayments = getAllPayments;
/**
 * ✏️ Get Single Payment
 */
const getSinglePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await paymentModel_1.PaymentModel.findById(id);
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }
        res.status(200).json({
            success: true,
            data: payment,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch payment",
            error,
        });
    }
};
exports.getSinglePayment = getSinglePayment;
/**
 * ✏️ Update Payment
 */
const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const payment = await paymentModel_1.PaymentModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Payment updated",
            data: payment,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update payment",
            error,
        });
    }
};
exports.updatePayment = updatePayment;
//# sourceMappingURL=paymentController.js.map