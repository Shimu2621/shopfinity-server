import { Request, Response } from "express";
import { PaymentModel } from "../models/paymentModel";
import Stripe from "stripe";

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

      success_url: `http://localhost:3000/payment-success?paymentId=${payment._id}`,
      cancel_url: `http://localhost:3000/payment-cancel?paymentId=${payment._id}`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Stripe session", error });
  }
};

/**
 * ✅ Payment Success
 */
// export const paymentSuccess = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const payment = await PaymentModel.findByIdAndUpdate(
//       id,
//       { paymentStatus: "paid" },
//       { new: true },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Payment successful",
//       data: payment,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Payment success update failed",
//       error,
//     });
//   }
// };

/**
 * ❌ Payment Cancel
 */
// export const paymentCancel = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const payment = await PaymentModel.findByIdAndUpdate(
//       id,
//       { paymentStatus: "cancelled" },
//       { new: true },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Payment cancelled",
//       data: payment,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Payment cancel failed",
//       error,
//     });
//   }
// };

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
