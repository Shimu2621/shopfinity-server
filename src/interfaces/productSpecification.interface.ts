import { Types } from "mongoose";

export interface IProductSpecification {
  key: string;
  value: string;
  productId: Types.ObjectId;
}
