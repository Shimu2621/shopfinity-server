"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getFeaturedCategoryProducts = exports.getAllProducts = exports.createProduct = void 0;
const productModel_1 = require("../models/productModel");
// ✅ Create Product
const createProduct = async (req, res) => {
    try {
        const product = await productModel_1.ProductModel.create(req.body);
        res.status(201).json({ success: true, product });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createProduct = createProduct;
// ✅ Get All Products (with pagination)
const getAllProducts = async (req, res) => {
    try {
        const { featured, categoryId, brandId, page = "1", limit = "10", } = req.query;
        const filter = {};
        if (featured === "true")
            filter.featured = true;
        if (categoryId)
            filter.categoryId = categoryId;
        if (brandId)
            filter.brandId = brandId;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        // ✅ Total count (IMPORTANT)
        const total = await productModel_1.ProductModel.countDocuments(filter);
        // ✅ Paginated products
        const products = await productModel_1.ProductModel.find(filter)
            .populate("categoryId", "name slug icon description parentId")
            .populate("brandId", "name")
            .limit(limitNumber)
            .skip(skip);
        // ✅ Map categoryId and brandId to category and brand in plain JS objects
        const mappedProducts = products.map((p) => {
            const obj = p.toObject();
            obj.category = obj.categoryId;
            obj.brand = obj.brandId;
            delete obj.categoryId;
            delete obj.brandId;
            return obj;
        });
        res.status(200).json({
            success: true,
            products: mappedProducts,
            total,
            page: pageNumber,
            limit: limitNumber,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAllProducts = getAllProducts;
// ✅ Get Featured Products (1 per Category)
const getFeaturedCategoryProducts = async (req, res) => {
    try {
        const products = await productModel_1.ProductModel.aggregate([
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
        await productModel_1.ProductModel.populate(products, [
            { path: "categoryId", select: "name slug icon" },
            { path: "brandId", select: "name" },
        ]);
        // Map to add `category` and `brand` fields
        const mappedProducts = products.map((p) => {
            const obj = p.toObject ? p.toObject() : p;
            obj.category = obj.categoryId;
            obj.brand = obj.brandId;
            return obj;
        });
        res.status(200).json({
            success: true,
            products: mappedProducts,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getFeaturedCategoryProducts = getFeaturedCategoryProducts;
// ✅ Get Single Product
const getSingleProduct = async (req, res) => {
    try {
        const product = await productModel_1.ProductModel.findById(req.params.id)
            .populate("categoryId")
            .populate("brandId");
        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getSingleProduct = getSingleProduct;
// ✅ Update Product
const updateProduct = async (req, res) => {
    try {
        const product = await productModel_1.ProductModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateProduct = updateProduct;
// ✅ Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await productModel_1.ProductModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        res
            .status(200)
            .json({ success: true, message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map