"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentMethodDistribution = exports.getTopCategoriesBySales = exports.getUserRegistrationTrend = exports.getTopSellingProducts = exports.getOrderStatusDistribution = exports.getSalesOverTime = exports.getDashboardSummary = void 0;
const orderModel_1 = require("../models/orderModel");
const userModel_1 = require("../models/userModel");
const productModel_1 = require("../models/productModel");
const paymentModel_1 = require("../models/paymentModel");
const productQuestionModel_1 = require("../models/productQuestionModel");
/**
 * ✅ MAIN DASHBOARD SUMMARY
 * (Top cards)
 */
const getDashboardSummary = async (req, res) => {
    try {
        const now = new Date();
        const last30Days = new Date();
        last30Days.setDate(now.getDate() - 30);
        const [revenueAgg, totalOrders, totalCustomers, totalProducts, pendingOrders, outOfStock, newCustomers, unansweredQuestions,] = await Promise.all([
            // 1️⃣ Total Revenue
            orderModel_1.OrderModel.aggregate([
                { $match: { status: "completed" } },
                { $group: { _id: null, total: { $sum: "$totalAmount" } } },
            ]),
            // 2️⃣ Total Orders
            orderModel_1.OrderModel.countDocuments(),
            // 3️⃣ Total Customers
            userModel_1.User.countDocuments({ role: "user" }),
            // 4️⃣ Total Products
            productModel_1.ProductModel.countDocuments(),
            // 5️⃣ Pending Orders
            orderModel_1.OrderModel.countDocuments({ status: "pending" }),
            // 6️⃣ Out of Stock
            productModel_1.ProductModel.countDocuments({ stock: { $lte: 0 } }),
            // 7️⃣ New Customers (Last 30 Days)
            userModel_1.User.countDocuments({
                role: "user",
                createdAt: { $gte: last30Days },
            }),
            // 8️⃣ Unanswered Questions
            productQuestionModel_1.ProductQuestionModel.countDocuments({ isAnswered: false }),
        ]);
        res.status(200).json({
            totalRevenue: revenueAgg[0]?.total || 0,
            totalOrders,
            totalCustomers,
            totalProducts,
            pendingOrders,
            outOfStock,
            newCustomers,
            unansweredQuestions,
        });
    }
    catch (error) {
        console.error("Dashboard Summary Error:", error);
        res.status(500).json({ message: "Failed to load dashboard data" });
    }
};
exports.getDashboardSummary = getDashboardSummary;
/**
 * 📈 SALES OVER TIME
 */
const getSalesOverTime = async (_req, res) => {
    try {
        const data = await paymentModel_1.PaymentModel.aggregate([
            { $match: { paymentStatus: "paid" } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    total: { $sum: "$amount" },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        res.status(200).json(data);
    }
    catch {
        res.status(500).json({ message: "Failed to load sales data" });
    }
};
exports.getSalesOverTime = getSalesOverTime;
/**
 * 🍩 ORDER STATUS DISTRIBUTION
 */
const getOrderStatusDistribution = async (_req, res) => {
    try {
        const data = await orderModel_1.OrderModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    }
    catch {
        res.status(500).json({ message: "Failed to load order status data" });
    }
};
exports.getOrderStatusDistribution = getOrderStatusDistribution;
/**
 * 🏆 TOP SELLING PRODUCTS
 */
const getTopSellingProducts = async (_req, res) => {
    try {
        const data = await orderModel_1.OrderModel.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.productId",
                    sold: { $sum: "$items.quantity" },
                },
            },
            { $sort: { sold: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $project: {
                    name: "$product.name",
                    sold: 1,
                },
            },
        ]);
        res.status(200).json(data);
    }
    catch {
        res.status(500).json({ message: "Failed to load top products" });
    }
};
exports.getTopSellingProducts = getTopSellingProducts;
/**
 * 🧑 USER REGISTRATION TREND
 */
const getUserRegistrationTrend = async (_req, res) => {
    try {
        const data = await userModel_1.User.aggregate([
            { $match: { role: "user" } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        res.status(200).json(data);
    }
    catch {
        res.status(500).json({ message: "Failed to load user trend" });
    }
};
exports.getUserRegistrationTrend = getUserRegistrationTrend;
/**
 * 🧩 TOP CATEGORIES BY SALES
 */
const getTopCategoriesBySales = async (_req, res) => {
    try {
        const data = await orderModel_1.OrderModel.aggregate([
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $group: {
                    _id: "$product.category",
                    total: { $sum: "$items.quantity" },
                },
            },
            { $sort: { total: -1 } },
            { $limit: 5 },
            {
                $project: {
                    name: "$_id",
                    total: 1,
                },
            },
        ]);
        res.status(200).json(data);
    }
    catch {
        res.status(500).json({ message: "Failed to load top categories" });
    }
};
exports.getTopCategoriesBySales = getTopCategoriesBySales;
/**
 * 💳 PAYMENT METHOD DISTRIBUTION
 */
const getPaymentMethodDistribution = async (_req, res) => {
    try {
        const data = await paymentModel_1.PaymentModel.aggregate([
            {
                $group: {
                    _id: "$paymentMethod",
                    count: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    }
    catch {
        res.status(500).json({ message: "Failed to load payment data" });
    }
};
exports.getPaymentMethodDistribution = getPaymentMethodDistribution;
//# sourceMappingURL=dashboardController.js.map