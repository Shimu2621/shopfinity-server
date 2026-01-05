import { Request, Response } from "express";
import { ProductSpecificationModel } from "../models/productSpecificationModel";
import { productSpecificationSchema } from "../validations/productSpecification.validation";
import { productSpecificationBulkSchema } from "../validations/productSpecification.validation";
import { Types } from "mongoose";

// Create a product specification
export const createProductSpecification = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = productSpecificationSchema.parse(req.body);
    const newSpec = await ProductSpecificationModel.create(validatedData);
    res.status(201).json(newSpec);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createProductSpecificationsBulk = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = productSpecificationBulkSchema.parse(req.body);

    const specifications = await ProductSpecificationModel.insertMany(
      validatedData
    );

    res.status(201).json({
      success: true,
      message: "Product specifications created successfully",
      data: specifications,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all product specifications
export const getProductSpecifications = async (req: Request, res: Response) => {
  try {
    const specs = await ProductSpecificationModel.find();
    res.status(200).json(specs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get product specification by productID
export const getSpecificationsByProductId = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId } = req.params;

    if (!Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const specs = await ProductSpecificationModel.find({
      productId,
    });

    res.status(200).json(specs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product specification by ID
export const getProductSpecification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    const spec = await ProductSpecificationModel.findById(id);
    if (!spec)
      return res.status(404).json({ error: "Specification not found" });

    res.status(200).json(spec);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product specification
export const updateProductSpecification = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    const validatedData = productSpecificationSchema.parse(req.body);
    const updatedSpec = await ProductSpecificationModel.findByIdAndUpdate(
      id,
      validatedData,
      { new: true }
    );
    if (!updatedSpec)
      return res.status(404).json({ error: "Specification not found" });

    res.status(200).json(updatedSpec);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product specification
export const deleteProductSpecification = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    const deletedSpec = await ProductSpecificationModel.findByIdAndDelete(id);
    if (!deletedSpec)
      return res.status(404).json({ error: "Specification not found" });

    res.status(200).json({ message: "Specification deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
