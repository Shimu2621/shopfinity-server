import { Types } from "mongoose";

export interface IBrand {
  name: string;
  categoryIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type IBrandQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
};
