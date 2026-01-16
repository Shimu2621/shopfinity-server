// src/routes/dashboardRoutes.ts
import { Router } from "express";
import {
  getDashboardSummary,
  getSalesOverTime,
  getOrderStatusDistribution,
  getTopSellingProducts,
  getUserRegistrationTrend,
  getPaymentMethodDistribution,
} from "../controllers/dashboardController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/dashboardMiddleware";

const router = Router();

router.use(authMiddleware, adminOnly);

router.get("/summary", getDashboardSummary);
router.get("/sales-over-time", getSalesOverTime);
router.get("/order-status", getOrderStatusDistribution);
router.get("/top-products", getTopSellingProducts);
router.get("/user-trend", getUserRegistrationTrend);
router.get("/payment-methods", getPaymentMethodDistribution);

export default router;
