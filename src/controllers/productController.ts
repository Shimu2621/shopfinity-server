import { Request, Response } from "express";
import { ProductModel } from "../models/productModel";

// ✅ Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

// ✅ Get All Products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await ProductModel.find().populate("categoryId brandId");
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// ✅ Get Single Product
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "categoryId brandId"
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// ✅ Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
