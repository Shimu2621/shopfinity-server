// interfaces/productAnswer.interface.ts
import { Types } from "mongoose";

export interface IProductAnswer {
  answer: string;
  questionId: Types.ObjectId; // ProductQuestion _id
  adminId: Types.ObjectId; // Admin(User) _id
  createdAt?: Date;
  updatedAt?: Date;
}
