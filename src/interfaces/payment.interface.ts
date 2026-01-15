import { Types } from "mongoose";

export interface IPayment {
  userId: Types.ObjectId;
  orderId: Types.ObjectId;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
}

export type IPaymentQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string; // For searching by user email, name, or payment ID
};
