"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getSingleCategory = exports.getAllCategories = exports.createCategory = void 0;
const slugify_1 = __importDefault(require("slugify"));
const categoryModel_1 = require("../models/categoryModel");
// ✅ Create Category
const createCategory = async (req, res) => {
    try {
        const { name, icon, description, parentId } = req.body;
        if (!name) {
            res.status(400).json({ message: "Category name is required" });
            return;
        }
        const slug = (0, slugify_1.default)(name, { lower: true });
        const existingCategory = await categoryModel_1.Category.findOne({ slug });
        if (existingCategory) {
            res.status(409).json({ message: "Category already exists" });
            return;
        }
        const newCategory = await categoryModel_1.Category.create({
            name,
            slug,
            icon,
            description,
            parentId,
        });
        res.status(201).json({
            message: "Category created successfully",
            data: newCategory,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.createCategory = createCategory;
// ✅ Get All Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel_1.Category.find()
            .populate("parentId", "name")
            .sort({ createdAt: -1 });
        res.status(200).json({
            message: "All categories retrieved successfully",
            data: categories,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.getAllCategories = getAllCategories;
// ✅ Get Single Category
const getSingleCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel_1.Category.findById(id).populate("parentId", "name");
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json({
            message: "Category retrieved successfully",
            data: category,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.getSingleCategory = getSingleCategory;
// ✅ Update Category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, icon, description, parentId } = req.body;
        const slug = name ? (0, slugify_1.default)(name, { lower: true }) : undefined;
        const updatedCategory = await categoryModel_1.Category.findByIdAndUpdate(id, { name, slug, icon, description, parentId }, { new: true, runValidators: true });
        if (!updatedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json({
            message: "Category updated successfully",
            data: updatedCategory,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.updateCategory = updateCategory;
// ✅ Delete Category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await categoryModel_1.Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map