import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

export interface ProductDocument extends IProduct, Document {}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: { type: [String], required: true },
    featured: { type: Boolean, default: false },
    isDiscountActive: { type: Boolean, default: false },
    discountPercentage: { type: Number },
    discountedPrice: { type: Number },
    discountValidUntil: { type: Date },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    brandId: { type: Schema.Types.ObjectId, ref: "Brand" },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
