"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBrand = exports.getSingleBrand = exports.getAllBrands = exports.createBrand = void 0;
const brandModel_1 = require("../models/brandModel");
// ✅ Create a new brand
const createBrand = async (req, res) => {
    try {
        const { name, categoryIds } = req.body;
        if (!name) {
            res.status(400).json({ message: "Brand name is required" });
            return;
        }
        const existingBrand = await brandModel_1.Brand.findOne({ name });
        if (existingBrand) {
            res.status(409).json({ message: "Brand name already exists" });
            return;
        }
        const newBrand = await brandModel_1.Brand.create({ name, categoryIds });
        res.status(201).json({
            message: "Brand created successfully",
            data: newBrand,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.createBrand = createBrand;
// ✅ Get all brands
// GET ALL WITH PAGINATION + SEARCH
const getAllBrands = async (req, res) => {
    try {
        const { page = "1", limit = "10", searchTerm } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const filter = {};
        if (searchTerm) {
            filter.name = { $regex: searchTerm, $options: "i" };
        }
        const total = await brandModel_1.Brand.countDocuments(filter);
        const brands = await brandModel_1.Brand.find(filter)
            .populate("categoryIds", "name")
            .skip(skip)
            .limit(limitNumber);
        res.status(200).json({
            message: "Brands retrieved",
            data: brands,
            meta: {
                total,
                page: pageNumber,
                limit: limitNumber,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getAllBrands = getAllBrands;
// ✅ Get single brand by ID
const getSingleBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await brandModel_1.Brand.findById(id).populate("categoryIds", "name");
        if (!brand) {
            res.status(404).json({ message: "Brand not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Brand retrieved successfully", data: brand });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.getSingleBrand = getSingleBrand;
// ✅ Update brand
const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, categoryIds } = req.body;
        const updatedBrand = await brandModel_1.Brand.findByIdAndUpdate(id, { name, categoryIds }, { new: true, runValidators: true });
        if (!updatedBrand) {
            res.status(404).json({ message: "Brand not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Brand updated successfully", data: updatedBrand });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.updateBrand = updateBrand;
// ✅ Delete brand
const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBrand = await brandModel_1.Brand.findByIdAndDelete(id);
        if (!deletedBrand) {
            res.status(404).json({ message: "Brand not found" });
            return;
        }
        res.status(200).json({ message: "Brand deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.deleteBrand = deleteBrand;
//# sourceMappingURL=brandController.js.map