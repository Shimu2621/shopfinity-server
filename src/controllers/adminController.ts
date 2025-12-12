import { Request, Response } from "express";
import { ProductModel } from "../models/productModel";
import { Category } from "../models/categoryModel";
import { OrderModel } from "../models/orderModel";
import { User } from "../models/userModel";
import mongoose from "mongoose";

/**
 * GET /api/admin/dashboard
 * returns counts: totalProducts, totalUsers, totalOrders, totalRevenue
 */
export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    const [productCount, userCount, orderCount] = await Promise.all([
      ProductModel.countDocuments(),
      User.countDocuments(),
      OrderModel.countDocuments(),
    ]);

    // sum revenue from paid orders (assuming Order has totalPrice and status fields)
    const revenueAgg = await OrderModel.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue = revenueAgg[0]?.totalRevenue ?? 0;

    res.json({
      success: true,
      data: { productCount, userCount, orderCount, totalRevenue },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};

/**
 * GET /api/admin/recent-orders
 */
export const getRecentOrders = async (req: Request, res: Response) => {
  try {
    const recentOrders = await OrderModel.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("userId", "name email")
      .populate("items.productId", "name price")
      .lean();

    res.json({ success: true, data: recentOrders });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};

/**
 * GET /api/admin/top-products
 * returns top N products by quantity sold
 */
export const getTopProducts = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 6;

    // Assuming Order schema: items: [{ productId: ObjectId, qty: Number }]
    const top = await OrderModel.aggregate([
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
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};

/**
 * GET /api/admin/sales-by-day?days=30
 * returns array: [{ date: '2025-12-01', total: 1234 }, ... ]
 */
export const getSalesByDay = async (req: Request, res: Response) => {
  try {
    const days = Number(req.query.days) || 30;
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const sales = await OrderModel.aggregate([
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
      data: sales.map((s: { _id: any; total: any }) => ({
        date: s._id,
        total: s.total,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};

/**
 * GET /api/admin/categories-tree
 * returns categories with nested children
 */
export const getCategoriesTree = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().lean();

    // build tree in memory
    const map = new Map<string, any>();
    categories.forEach((cat) =>
      map.set(String(cat._id), { ...cat, children: [] })
    );

    const tree: any[] = [];
    for (const cat of categories) {
      if (cat.parentId) {
        const parent = map.get(String(cat.parentId));
        if (parent) parent.children.push(map.get(String(cat._id)));
      } else {
        tree.push(map.get(String(cat._id)));
      }
    }

    res.json({ success: true, data: tree });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};
