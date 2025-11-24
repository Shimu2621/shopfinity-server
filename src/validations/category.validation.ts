import { z } from "zod";
import mongoose from "mongoose";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    icon: z.string().optional(),
    description: z.string().optional(),
    parentId: z
      .string()
      .refine((val) => mongoose.isValidObjectId(val), "Invalid parentId")
      .nullable()
      .optional(),
  }),
});
