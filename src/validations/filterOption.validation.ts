import { z } from "zod";

export const createFilterOptionSchema = z.object({
  name: z.string(),
  type: z.enum(["select", "range", "checkbox"]),
  options: z.array(z.string()).optional(),
  unit: z.string().optional(),
  categoryId: z.string(),
});

export const updateFilterOptionSchema = z.object({
  name: z.string().optional(),
  type: z.enum(["select", "range", "checkbox"]).optional(),
  options: z.array(z.string()).optional(),
  unit: z.string().optional(),
});
