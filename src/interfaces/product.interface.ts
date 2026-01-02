export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isDiscountActive: boolean;
  discountPercentage?: number;
  discountedPrice?: number;
  discountValidUntil?: Date;
  categoryId?: string;
  brandId?: string;
}

export type IProductQuery = {
  page?: string;
  limit?: string;
  categoryId?: string;
  brandId?: string;
  featured?: "true" | "false";
  isDiscountActive?: "true" | "false";
  [key: string]: string | undefined;
};
