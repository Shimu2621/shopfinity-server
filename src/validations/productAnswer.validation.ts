// validations/productAnswer.validation.ts
import { z } from "zod";

export const productAnswerSchema = z.object({
  answer: z.string().min(1, "Answer is required"),
  questionId: z.string().min(1, "Question ID is required"),
  adminId: z.string().min(1, "Admin ID is required"),
});

export type ProductAnswerInput = z.infer<typeof productAnswerSchema>;
