import mongoose, { Schema, Model, Document } from "mongoose";
import { ICategory } from "../interfaces/category.interface";

export interface CategoryDocument extends ICategory, Document {}

const categorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    icon: { type: String, trim: true },
    description: { type: String, trim: true },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

export const Category: Model<CategoryDocument> =
  mongoose.model<CategoryDocument>("Category", categorySchema);
