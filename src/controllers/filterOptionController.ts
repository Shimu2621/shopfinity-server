import { Request, Response } from "express";
import { FilterOptionModel } from "../models/filterOptionModel";

/**
 * ➕ Create Filter Option
 */
export const createFilterOption = async (req: Request, res: Response) => {
  try {
    const filterOption = await FilterOptionModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Filter option created successfully",
      data: filterOption,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create filter option",
      error,
    });
  }
};

/**
 * 📄 Get Single Filter Option
 */
export const getFilterOption = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const filterOption =
      await FilterOptionModel.findById(id).populate("categoryId");

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch filter option",
      error,
    });
  }
};

// ✅ Get Filter Option By Category
export const getFilterOptionsByCategory = async (
  req: Request,
  res: Response,
) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "categoryId is required",
      });
    }

    const filter: any = {};
    if (categoryId) filter.categoryId = categoryId;

    const filterOptions =
      await FilterOptionModel.find(filter).populate("categoryId");

    res.status(200).json({
      success: true,
      total: filterOptions.length,
      data: filterOptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

/**
 * ✏️ Update Filter Option
 */
export const updateFilterOption = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await FilterOptionModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Filter option updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update filter option",
      error,
    });
  }
};

/**
 * ❌ Delete Filter Option
 */
export const deleteFilterOption = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await FilterOptionModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Filter option deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete filter option",
      error,
    });
  }
};
