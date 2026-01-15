import mongoose, { Schema, Document } from "mongoose";
import { IOrder } from "../interfaces/order.interface";

export interface OrderDocument extends IOrder, Document {}

const orderItemSchemaMongo = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // ✅ change here
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchemaMongo = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // optional: ref User
    items: [orderItemSchemaMongo],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<OrderDocument>(
  "Order",
  orderSchemaMongo
);
