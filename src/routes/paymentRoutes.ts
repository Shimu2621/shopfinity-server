import { Router } from "express";
import {
  createPayment,
  paymentSuccess,
  paymentCancel,
  getAllPayments,
  updatePayment,
  createStripeSession,
} from "../controllers/paymentController";

const router = Router();

router.post("/", createPayment);
router.get("/", getAllPayments);
router.patch("/:id", updatePayment);
router.patch("/:id/success", paymentSuccess);
router.patch("/:id/cancel", paymentCancel);

// ✅ Stripe session route
router.post("/create-stripe-session", createStripeSession);

export default router;
