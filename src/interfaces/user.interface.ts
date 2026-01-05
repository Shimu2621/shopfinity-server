import { Document, Types } from "mongoose";

/**
 * User Type Definition
 * - Optional fields: avatarUrl, phone, address
 * - Role-based access: "user" | "admin"
 */

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password?: string; // optional for profile updates
  avatarUrl?: string; // optional for signup/login/update
  phone?: string; // optional for signup/login/update
  address?: string; // optional for signup/login/update
  role?: "user" | "admin";
  createdAt: Date;
}

export type IUserQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
};
