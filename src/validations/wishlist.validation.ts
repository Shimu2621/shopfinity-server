import { z } from "zod";

export const createWishlistSchema = z.object({
  body: z.object({
    userId: z.string().nonempty("User ID is required"),
    productId: z.string().nonempty("Product ID is required"),
  }),
});
