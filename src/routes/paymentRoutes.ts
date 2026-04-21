import express from "express";
import {
  createPayment,
  // paymentSuccess,
  // paymentCancel,
  getAllPayments,
  updatePayment,
  createStripeSession,
  getSinglePayment,
} from "../controllers/paymentController";

import { stripeWebhook } from "../controllers/stripeWebhookController";

const router = express.Router();

router.post("/", createPayment);
router.get("/", getAllPayments);
router.get("/:id", getSinglePayment);
router.patch("/:id", updatePayment);

// ✅ Stripe session route
router.post("/create-stripe-session", createStripeSession);

/* ⭐ NEW STRIPE WEBHOOK ROUTE */
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

export default router;
