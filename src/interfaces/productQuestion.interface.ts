// interfaces/productQuestion.interface.ts
import { Types } from "mongoose";

export interface IProductQuestion {
  question: string;
  userId: Types.ObjectId; // ✅ FIXED
  productId: Types.ObjectId; // ✅ FIXED
  createdAt?: Date;
  updatedAt?: Date;
}
