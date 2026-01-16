// src/controllers/dashboardController.ts
import { Request, Response } from "express";
import { OrderModel } from "../models/orderModel";
import { User } from "../models/userModel";
import { ProductModel } from "../models/productModel";
import { PaymentModel } from "../models/paymentModel";

/**
 * ✅ MAIN DASHBOARD SUMMARY
 * (Top cards)
 */
export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await PaymentModel.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalOrders = await OrderModel.countDocuments();
    const pendingOrders = await OrderModel.countDocuments({
      status: "pending",
    });

    const totalCustomers = await User.countDocuments({ role: "user" });
    const totalProducts = await ProductModel.countDocuments();
    const outOfStock = await ProductModel.countDocuments({ stock: 0 });

    const newCustomers = await User.countDocuments({
      role: "user",
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    });

    res.status(200).json({
      revenue: totalRevenue[0]?.total || 0,
      totalOrders,
      pendingOrders,
      totalCustomers,
      totalProducts,
      outOfStock,
      newCustomers,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard summary" });
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
  res: Response
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
  res: Response
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
 * 💳 PAYMENT METHOD DISTRIBUTION
 */
export const getPaymentMethodDistribution = async (
  _req: Request,
  res: Response
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
