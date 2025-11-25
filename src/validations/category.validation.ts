import { z } from "zod";
import mongoose from "mongoose";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    icon: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    parentId: z
      .string()
      .refine((val) => mongoose.isValidObjectId(val), "Invalid parentId")
      .nullable()
      .optional(),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    parentId: z.string().optional(),
  }),
});

export const getSingleCategorySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
