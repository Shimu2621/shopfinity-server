// src/controllers/dashboardController.ts
import { Request, Response } from "express";
import { OrderModel } from "../models/orderModel";
import { User } from "../models/userModel";
import { ProductModel } from "../models/productModel";
import { PaymentModel } from "../models/paymentModel";
import { ProductQuestionModel } from "../models/productQuestionModel";

/**
 * ✅ MAIN DASHBOARD SUMMARY
 * (Top cards)
 */
export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const last30Days = new Date();
    last30Days.setDate(now.getDate() - 30);

    const [
      revenueAgg,
      totalOrders,
      totalCustomers,
      totalProducts,
      pendingOrders,
      outOfStock,
      newCustomers,
      unansweredQuestions,
    ] = await Promise.all([
      // 1️⃣ Total Revenue
      OrderModel.aggregate([
        { $match: { status: "completed" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),

      // 2️⃣ Total Orders
      OrderModel.countDocuments(),

      // 3️⃣ Total Customers
      User.countDocuments({ role: "user" }),

      // 4️⃣ Total Products
      ProductModel.countDocuments(),

      // 5️⃣ Pending Orders
      OrderModel.countDocuments({ status: "pending" }),

      // 6️⃣ Out of Stock
      ProductModel.countDocuments({ stock: { $lte: 0 } }),

      // 7️⃣ New Customers (Last 30 Days)
      User.countDocuments({
        role: "user",
        createdAt: { $gte: last30Days },
      }),

      // 8️⃣ Unanswered Questions
      ProductQuestionModel.countDocuments({ isAnswered: false }),
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
  } catch (error) {
    console.error("Dashboard Summary Error:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

/**
 * 📈 SALES OVER TIME
 */
export const getSalesOverTime = async (_req: Request, res: Response) => {
  try {
    const data = await PaymentModel.aggregate([
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
  } catch {
    res.status(500).json({ message: "Failed to load sales data" });
  }
};

/**
 * 🍩 ORDER STATUS DISTRIBUTION
 */
export const getOrderStatusDistribution = async (
  _req: Request,
  res: Response,
) => {
  try {
    const data = await OrderModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: "Failed to load order status data" });
  }
};

/**
 * 🏆 TOP SELLING PRODUCTS
 */
export const getTopSellingProducts = async (_req: Request, res: Response) => {
  try {
    const data = await OrderModel.aggregate([
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
  } catch {
    res.status(500).json({ message: "Failed to load top products" });
  }
};

/**
 * 🧑 USER REGISTRATION TREND
 */
export const getUserRegistrationTrend = async (
  _req: Request,
  res: Response,
) => {
  try {
    const data = await User.aggregate([
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
  } catch {
    res.status(500).json({ message: "Failed to load user trend" });
  }
};

/**
 * 🧩 TOP CATEGORIES BY SALES
 */
export const getTopCategoriesBySales = async (_req: Request, res: Response) => {
  try {
    const data = await OrderModel.aggregate([
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
  } catch {
    res.status(500).json({ message: "Failed to load top categories" });
  }
};

/**
 * 💳 PAYMENT METHOD DISTRIBUTION
 */
export const getPaymentMethodDistribution = async (
  _req: Request,
  res: Response,
) => {
  try {
    const data = await PaymentModel.aggregate([
      {
        $group: {
          _id: "$paymentMethod",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: "Failed to load payment data" });
  }
};
