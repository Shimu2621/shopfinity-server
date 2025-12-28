import { Schema, model } from "mongoose";
import { IWishlist } from "../interfaces/wishlist.interface";

const wishlistSchema = new Schema<IWishlist>(
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
  },
  { timestamps: true }
);

// Prevent duplicate wishlist items
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const WishlistModel = model<IWishlist>("Wishlist", wishlistSchema);
