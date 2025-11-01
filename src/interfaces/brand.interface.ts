import { Types } from "mongoose";

export interface IBrand {
  name: string;
  categoryId?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}
