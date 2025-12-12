export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
  orderItems: IOrderItem[];
}
