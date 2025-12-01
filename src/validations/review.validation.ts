import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().min(1, "Comment is required"),
    userId: z.string().min(1, "User ID is required"),
    productId: z.string().min(1, "Product ID is required"),
  }),
});

export const updateReviewSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});
