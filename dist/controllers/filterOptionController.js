"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFilterOption = exports.updateFilterOption = exports.getFilterOptionsByCategory = exports.getFilterOption = exports.getFilterOptions = exports.createFilterOption = void 0;
const filterOptionModel_1 = require("../models/filterOptionModel");
/**
 * ➕ Create Filter Option
 */
const createFilterOption = async (req, res) => {
    try {
        const filterOption = await filterOptionModel_1.FilterOptionModel.create(req.body);
        res.status(201).json({
            success: true,
            message: "Filter option created successfully",
            data: filterOption,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create filter option",
            error,
        });
    }
};
exports.createFilterOption = createFilterOption;
/**
 * 📄 Get Filter Options
 */
const getFilterOptions = async (req, res) => {
    const { categoryId } = req.query;
    const brands = await filterOptionModel_1.FilterOptionModel.find({ categoryId }).select("name _id");
    res.json({
        brands,
        priceRange: [0, 5000],
    });
};
exports.getFilterOptions = getFilterOptions;
/**
 * 📄 Get Single Filter Option
 */
const getFilterOption = async (req, res) => {
    try {
        const { id } = req.params;
        const filterOption = await filterOptionModel_1.FilterOptionModel.findById(id).populate("categoryId");
        if (!filterOption) {
            return res.status(404).json({
                success: false,
                message: "Filter option not found",
            });
        }
        res.status(200).json({
            success: true,
            data: filterOption,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch filter option",
            error,
        });
    }
};
exports.getFilterOption = getFilterOption;
// ✅ Get Filter Option By Category
const getFilterOptionsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "categoryId is required",
            });
        }
        const filter = {};
        if (categoryId)
            filter.categoryId = categoryId;
        const filterOptions = await filterOptionModel_1.FilterOptionModel.find(filter).populate("categoryId");
        res.status(200).json({
            success: true,
            total: filterOptions.length,
            data: filterOptions,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getFilterOptionsByCategory = getFilterOptionsByCategory;
/**
 * ✏️ Update Filter Option
 */
const updateFilterOption = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await filterOptionModel_1.FilterOptionModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Filter option updated successfully",
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update filter option",
            error,
        });
    }
};
exports.updateFilterOption = updateFilterOption;
/**
 * ❌ Delete Filter Option
 */
const deleteFilterOption = async (req, res) => {
    try {
        const { id } = req.params;
        await filterOptionModel_1.FilterOptionModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Filter option deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete filter option",
            error,
        });
    }
};
exports.deleteFilterOption = deleteFilterOption;
//# sourceMappingURL=filterOptionController.js.map