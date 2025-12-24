import { z } from "zod";

export const productQuestionSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  userId: z.string(),
  productId: z.string(),
});

export type ProductQuestionInput = z.infer<typeof productQuestionSchema>;
