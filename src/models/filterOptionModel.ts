import { Schema, model } from "mongoose";
import { IFilterOption } from "../interfaces/filterOption.interface";

const filterOptionSchema = new Schema<IFilterOption>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["select", "range", "checkbox"],
      required: true,
    },
    options: {
      type: [String],
    },
    unit: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FilterOptionModel = model<IFilterOption>(
  "FilterOption",
  filterOptionSchema
);
