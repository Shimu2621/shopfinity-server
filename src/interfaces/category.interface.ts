import { Types } from "mongoose";

export interface ICategory {
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  parentId?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}
