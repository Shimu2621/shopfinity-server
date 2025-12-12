import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
});

export const orderSchema = z.object({
  userId: z.string(),
  items: z.array(orderItemSchema),
  totalAmount: z.number().min(0),
  status: z
    .enum(["pending", "processing", "shipped", "delivered", "cancelled"])
    .default("pending"),
});

export type OrderInput = z.infer<typeof orderSchema>;
