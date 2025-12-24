// models/productQuestionModel.ts
import mongoose, { Schema, HydratedDocument } from "mongoose";
import { IProductQuestion } from "../interfaces/productQuestion.interface";

export type ProductQuestionDocument = HydratedDocument<IProductQuestion>;

const productQuestionSchema = new Schema<IProductQuestion>(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

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

export const ProductQuestionModel = mongoose.model<IProductQuestion>(
  "ProductQuestion",
  productQuestionSchema
);
