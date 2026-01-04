export interface IReview {
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: Date;
}

export type IReviewQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
};
