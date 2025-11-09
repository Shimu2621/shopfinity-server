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
