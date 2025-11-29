import mongoose from "mongoose";
import { z } from "zod";

export const createBrandSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Brand name is required"),
    categoryIds: z.array(z.string()).optional(),
  }),
});

export const updateBrandSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    categoryIds: z.array(z.string()).optional(),
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
