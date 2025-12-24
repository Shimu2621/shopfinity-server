import mongoose, { Schema, model, Document } from "mongoose";
import { IProductSpecification } from "../interfaces/productSpecification.interface";

interface ProductSpecificationDocument
  extends IProductSpecification,
    Document {}

const productSpecificationSchema = new Schema<ProductSpecificationDocument>(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

export const ProductSpecificationModel = model<ProductSpecificationDocument>(
  "ProductSpecification",
  productSpecificationSchema
);
