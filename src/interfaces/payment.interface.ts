import { Types } from "mongoose";

export interface IPayment {
  userId: Types.ObjectId;
  orderId: Types.ObjectId;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
}
