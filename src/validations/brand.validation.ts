import mongoose from "mongoose";
import { z } from "zod";

export const createBrandSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Brand name is required"),
    categoryId: z
      .string()
      .refine((val) => mongoose.isValidObjectId(val), "Invalid categoryId")
      .optional()
      .nullable(),
  }),
});

export const updateBrandSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().optional(),
    categoryId: z
      .string()
      .refine((val) => mongoose.isValidObjectId(val), "Invalid categoryId")
      .optional()
      .nullable(),
  }),
});

export const getSingleBrandSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const deleteBrandSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
