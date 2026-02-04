import { Request, Response } from "express";
import Stripe from "stripe";
import { PaymentModel } from "../models/paymentModel";
import { OrderModel } from "../models/orderModel";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  /* ⭐ PAYMENT SUCCESS EVENT */
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const paymentId = session.metadata?.paymentId;

    if (!paymentId) return res.json({ received: true });

    const payment = await PaymentModel.findByIdAndUpdate(paymentId, {
      paymentStatus: "paid",
    });

    if (payment) {
      await OrderModel.findByIdAndUpdate(payment.orderId, {
        status: "processing",
        paymentStatus: "paid",
      });
    }
  }

  res.json({ received: true });
};
