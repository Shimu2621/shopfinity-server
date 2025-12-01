import mongoose, { Schema, Model, Document } from "mongoose";
import { IBrand } from "../interfaces/brand.interface";

export interface BrandDocument extends IBrand, Document {}

const brandSchema = new Schema<BrandDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },

    // ✔ Array of ObjectId
    categoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

export const Brand: Model<BrandDocument> = mongoose.model<BrandDocument>(
  "Brand",
  brandSchema
);
