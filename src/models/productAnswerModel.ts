// models/productAnswerModel.ts
import mongoose, { Schema, HydratedDocument } from "mongoose";
import { IProductAnswer } from "../interfaces/productAnswer.interface";

export type ProductAnswerDocument = HydratedDocument<IProductAnswer>;

const productAnswerSchema = new Schema<IProductAnswer>(
  {
    answer: {
      type: String,
      required: true,
      trim: true,
    },

    questionId: {
      type: Schema.Types.ObjectId,
      ref: "ProductQuestion",
      required: true,
    },

    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductAnswerModel = mongoose.model<IProductAnswer>(
  "ProductAnswer",
  productAnswerSchema
);
