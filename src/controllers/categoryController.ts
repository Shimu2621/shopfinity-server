import { Request, Response } from "express";
import slugify from "slugify";
import { Category } from "../models/categoryModel";

// ✅ Create Category
export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, icon, description, parentId } = req.body;

    if (!name) {
      res.status(400).json({ message: "Category name is required" });
      return;
    }

    const slug = slugify(name, { lower: true });
    const existingCategory = await Category.findOne({ slug });

    if (existingCategory) {
      res.status(409).json({ message: "Category already exists" });
      return;
    }

    const newCategory = await Category.create({
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
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Categories
export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Category.find()
      .populate("parentId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All categories retrieved successfully",
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Single Category
export const getSingleCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("parentId", "name");

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Category
export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, icon, description, parentId } = req.body;

    const slug = name ? slugify(name, { lower: true }) : undefined;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, slug, icon, description, parentId },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete Category
export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
