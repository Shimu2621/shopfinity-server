import { Types } from "mongoose";

export interface IBrand {
  name: string;
  categoryIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
