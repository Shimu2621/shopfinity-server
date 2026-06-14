import { Request, Response } from "express";
import { PaymentModel } from "../models/paymentModel";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * ➕ Create Payment
 */
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { userId, orderId, amount, paymentMethod } = req.body;

    const payment = await PaymentModel.create({
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create payment",
      error,
    });
  }
};

/**
 * 🛒 Create Stripe Checkout Session
 */
export const createStripeSession = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;

    const payment = await PaymentModel.findById(paymentId).populate("orderId");

    if (!payment) return res.status(404).json({ message: "Payment not found" });

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
  } catch (error) {
    res.status(500).json({ message: "Failed to create Stripe session", error });
  }
};

/**
 * 🛒 Create stripeWebhook
 */
export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.log("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // IMPORTANT PART
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const paymentId = session.metadata?.paymentId;

    if (paymentId) {
      await PaymentModel.findByIdAndUpdate(paymentId, {
        paymentStatus: "paid",
      });

      console.log("✅ Payment marked as PAID");
    }
  }

  res.json({ received: true });
};

/**
 * 📦 Get All Payments (Admin)
 */
export const getAllPayments = async (_req: Request, res: Response) => {
  try {
    const payments = await PaymentModel.find()
      .populate("userId")
      .populate("orderId");

    res.status(200).json({
      success: true,
      total: payments.length,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
      error,
    });
  }
};

/**
 * ✏️ Get Single Payment
 */
export const getSinglePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const payment = await PaymentModel.findById(id);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment",
      error,
    });
  }
};

/**
 * ✏️ Update Payment
 */
export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const payment = await PaymentModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Payment updated",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update payment",
      error,
    });
  }
};
