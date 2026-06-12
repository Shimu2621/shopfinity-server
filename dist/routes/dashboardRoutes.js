"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/dashboardRoutes.ts
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const dashboardMiddleware_1 = require("../middleware/dashboardMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware, dashboardMiddleware_1.dashboardMiddleware);
router.get("/summary", authMiddleware_1.authMiddleware, dashboardMiddleware_1.dashboardMiddleware, dashboardController_1.getDashboardSummary);
router.get("/sales-over-time", dashboardController_1.getSalesOverTime);
router.get("/order-status", dashboardController_1.getOrderStatusDistribution);
router.get("/top-products", dashboardController_1.getTopSellingProducts);
router.get("/user-trend", dashboardController_1.getUserRegistrationTrend);
router.get("/top-categories", dashboardController_1.getTopCategoriesBySales);
router.get("/payment-methods", dashboardController_1.getPaymentMethodDistribution);
exports.default = router;
//# sourceMappingURL=dashboardRoutes.js.map