import { Request, Response } from "express";
import { Brand } from "../models/brandModel";

// ✅ Create a new brand
export const createBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, categoryIds } = req.body;

    if (!name) {
      res.status(400).json({ message: "Brand name is required" });
      return;
    }

    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      res.status(409).json({ message: "Brand name already exists" });
      return;
    }

    const newBrand = await Brand.create({ name, categoryIds });
    res.status(201).json({
      message: "Brand created successfully",
      data: newBrand,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all brands
export const getAllBrands = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const brands = await Brand.find().populate("categoryIds", "name");
    res.status(200).json({ message: "All brands retrieved", data: brands });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single brand by ID
export const getSingleBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id).populate("categoryIds", "name");

    if (!brand) {
      res.status(404).json({ message: "Brand not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Brand retrieved successfully", data: brand });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update brand
export const updateBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, categoryIds } = req.body;

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { name, categoryIds },
      { new: true, runValidators: true }
    );

    if (!updatedBrand) {
      res.status(404).json({ message: "Brand not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Brand updated successfully", data: updatedBrand });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete brand
export const deleteBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      res.status(404).json({ message: "Brand not found" });
      return;
    }

    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
