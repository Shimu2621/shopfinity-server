import { Types } from "mongoose";

export type FilterType = "select" | "range" | "checkbox";

export interface IFilterOption {
  name: string;
  type: FilterType;
  options?: string[];
  unit?: string;
  categoryId: Types.ObjectId;
}

export type IFilterOptionQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
  categoryId?: string;
};
