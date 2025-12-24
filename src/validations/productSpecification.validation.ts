import { z } from "zod";

export const productSpecificationSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
  productId: z.string().min(1, "Product ID is required"),
});
