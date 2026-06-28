import { Request, Response } from "express";
import { ProductModel } from "../models/productModel";
import {
  IProductQuery,
  IProductWithCategoryBrand,
} from "../interfaces/product.interface";

// ✅ Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

// ✅ Get All Products (with pagination)
export const getAllProducts = async (
  req: Request<{}, {}, {}, IProductQuery>,
  res: Response,
) => {
  try {
    const {
      featured,
      categoryId,
      brandId,
      page = "1",
      limit = "10",
    } = req.query;

    const filter: any = {};

    if (featured === "true") filter.featured = true;
    if (categoryId) filter.categoryId = categoryId;
    if (brandId) filter.brandId = brandId;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // ✅ Total count
    const total = await ProductModel.countDocuments(filter);

    // ✅ Paginated products
    const products = await ProductModel.find(filter)
      .populate("categoryId", "name slug icon description parentId")
      .populate("brandId", "name")
      .limit(limitNumber)
      .skip(skip);

    console.log("STEP 3");

    // ✅ Map categoryId and brandId to category and brand in plain JS objects
    const mappedProducts = (products as IProductWithCategoryBrand[]).map(
      (p) => {
        const obj = p.toObject();
        obj.category = obj.categoryId;
        obj.brand = obj.brandId;
        delete obj.categoryId;
        delete obj.brandId;
        return obj;
      },
    );

    res.status(200).json({
      success: true,
      products: mappedProducts,
      total,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

// export const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     console.log("START");

//     return res.status(200).json({
//       success: true,
//       message: "Controller reached",
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// ✅ Get Featured Products (1 per Category)
export const getFeaturedCategoryProducts = async (
  req: Request,
  res: Response,
) => {
  try {
    const products = await ProductModel.aggregate([
      {
        $sort: { featured: -1, createdAt: -1 },
      },

      {
        $group: {
          _id: "$categoryId",
          product: { $first: "$$ROOT" },
        },
      },

      { $replaceRoot: { newRoot: "$product" } },
      { $limit: 10 },
    ]);

    // Populate category & brand manually after aggregation
    await ProductModel.populate(products, [
      { path: "categoryId", select: "name slug icon" },
      { path: "brandId", select: "name" },
    ]);

    // Map to add `category` and `brand` fields
    const mappedProducts = products.map((p) => {
      const obj = (p as any).toObject ? (p as any).toObject() : p;
      obj.category = obj.categoryId;
      obj.brand = obj.brandId;
      return obj;
    });

    res.status(200).json({
      success: true,
      products: mappedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

// ✅ Get Single Product
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id)
      .populate("categoryId")
      .populate("brandId");
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
      },
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
