"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesTree = exports.getSalesByDay = exports.getTopProducts = exports.getRecentOrders = exports.getDashboardSummary = void 0;
const productModel_1 = require("../models/productModel");
const categoryModel_1 = require("../models/categoryModel");
const orderModel_1 = require("../models/orderModel");
const userModel_1 = require("../models/userModel");
/**
 * GET /api/admin/dashboard
 * returns counts: totalProducts, totalUsers, totalOrders, totalRevenue
 */
const getDashboardSummary = async (req, res) => {
    try {
        const [productCount, userCount, orderCount] = await Promise.all([
            productModel_1.ProductModel.countDocuments(),
            userModel_1.User.countDocuments(),
            orderModel_1.OrderModel.countDocuments(),
        ]);
        // sum revenue from paid orders (assuming Order has totalPrice and status fields)
        const revenueAgg = await orderModel_1.OrderModel.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
        ]);
        const totalRevenue = revenueAgg[0]?.totalRevenue ?? 0;
        res.json({
            success: true,
            data: { productCount, userCount, orderCount, totalRevenue },
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error", error });
    }
};
exports.getDashboardSummary = getDashboardSummary;
/**
 * GET /api/admin/recent-orders
 */
const getRecentOrders = async (req, res) => {
    try {
        const recentOrders = await orderModel_1.OrderModel.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("userId", "name email")
            .populate("items.productId", "name price")
            .lean();
        res.json({ success: true, data: recentOrders });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error", error });
    }
};
exports.getRecentOrders = getRecentOrders;
/**
 * GET /api/admin/top-products
 * returns top N products by quantity sold
 */
const getTopProducts = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 6;
        // Assuming Order schema: items: [{ productId: ObjectId, qty: Number }]
        const top = await orderModel_1.OrderModel.aggregate([
            { $unwind: "$items" },
            {
                $group: { _id: "$items.productId", totalSold: { $sum: "$items.qty" } },
            },
            { $sort: { totalSold: -1 } },
            { $limit: limit },
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
                    _id: 0,
                    productId: "$product._id",
                    name: "$product.name",
                    images: "$product.images",
                    totalSold: 1,
                    price: "$product.price",
                },
            },
        ]);
        res.json({ success: true, data: top });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error", error });
    }
};
exports.getTopProducts = getTopProducts;
/**
 * GET /api/admin/sales-by-day?days=30
 * returns array: [{ date: '2025-12-01', total: 1234 }, ... ]
 */
const getSalesByDay = async (req, res) => {
    try {
        const days = Number(req.query.days) || 30;
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);
        const sales = await orderModel_1.OrderModel.aggregate([
            { $match: { status: "completed", createdAt: { $gte: fromDate } } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    total: { $sum: "$totalPrice" },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        // normalize result
        res.json({
            success: true,
            data: sales.map((s) => ({
                date: s._id,
                total: s.total,
            })),
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error", error });
    }
};
exports.getSalesByDay = getSalesByDay;
/**
 * GET /api/admin/categories-tree
 * returns categories with nested children
 */
const getCategoriesTree = async (req, res) => {
    try {
        const categories = await categoryModel_1.Category.find().lean();
        // build tree in memory
        const map = new Map();
        categories.forEach((cat) => map.set(String(cat._id), { ...cat, children: [] }));
        const tree = [];
        for (const cat of categories) {
            if (cat.parentId) {
                const parent = map.get(String(cat.parentId));
                if (parent)
                    parent.children.push(map.get(String(cat._id)));
            }
            else {
                tree.push(map.get(String(cat._id)));
            }
        }
        res.json({ success: true, data: tree });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error", error });
    }
};
exports.getCategoriesTree = getCategoriesTree;
//# sourceMappingURL=adminController.js.map