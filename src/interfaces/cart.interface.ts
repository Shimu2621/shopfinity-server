import { Types } from "mongoose";

export interface ICart {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
}
export type ICartQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
  userId?: string;
};
