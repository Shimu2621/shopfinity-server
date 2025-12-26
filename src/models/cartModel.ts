import { Schema, model } from "mongoose";
import { ICart } from "../interfaces/cart.interface";

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate product for same user
cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const CartModel = model<ICart>("Cart", cartSchema);
