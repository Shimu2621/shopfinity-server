import mongoose from "mongoose";
import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be positive"),
    stock: z.number().int().nonnegative("Stock cannot be negative"),
    images: z.array(z.string()).min(1, "At least one image is required"),

    featured: z.boolean().optional(),
    isDiscountActive: z.boolean().optional(),
    discountPercentage: z.number().optional(),
    discountedPrice: z.number().optional(),
    discountValidUntil: z.string().datetime().optional(),
    categoryId: z.string().optional(),
    brandId: z.string().optional(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      price: z.number().optional(),
      stock: z.number().optional(),
      images: z.array(z.string()).optional(),

      featured: z.boolean().optional(),
      isDiscountActive: z.boolean().optional(),
      discountPercentage: z.number().optional(),
      discountedPrice: z.number().optional(),
      discountValidUntil: z.string().datetime().optional(),

      categoryId: z.string().optional(),
      brandId: z.string().optional(),
    })
    .strict(),
});
