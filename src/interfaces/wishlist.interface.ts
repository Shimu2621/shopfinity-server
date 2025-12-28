import { Types } from "mongoose";

/**
 * Database representation
 */
export interface IWishlist {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Create wishlist item
 */
export interface IWishlistCreatePayload {
  userId: string;
  productId: string;
}

/**
 * Query params
 */
export interface IWishlistQuery {
  page?: string;
  limit?: string;
  userId?: string;
  searchTerm?: string;
}
