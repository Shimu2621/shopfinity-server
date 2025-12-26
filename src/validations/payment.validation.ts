import { z } from "zod";

export const createPaymentSchema = z.object({
  userId: z.string(),
  orderId: z.string(),
  amount: z.number().positive(),
  paymentMethod: z.string(),
});

export const updatePaymentSchema = z.object({
  paymentStatus: z.string(),
});
