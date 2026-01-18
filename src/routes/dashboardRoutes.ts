// src/routes/dashboardRoutes.ts
import { Router } from "express";
import {
  getDashboardSummary,
  getSalesOverTime,
  getOrderStatusDistribution,
  getTopSellingProducts,
  getUserRegistrationTrend,
  getPaymentMethodDistribution,
  getTopCategoriesBySales,
} from "../controllers/dashboardController";
import { authMiddleware } from "../middleware/authMiddleware";
import { dashboardMiddleware } from "../middleware/dashboardMiddleware";

const router = Router();

router.use(authMiddleware, dashboardMiddleware);

router.get(
  "/summary",
  authMiddleware,
  dashboardMiddleware,
  getDashboardSummary,
);
router.get("/sales-over-time", getSalesOverTime);
router.get("/order-status", getOrderStatusDistribution);
router.get("/top-products", getTopSellingProducts);
router.get("/user-trend", getUserRegistrationTrend);
router.get("/top-categories", getTopCategoriesBySales);
router.get("/payment-methods", getPaymentMethodDistribution);

export default router;
