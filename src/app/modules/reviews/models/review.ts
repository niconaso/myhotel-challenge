export interface Review {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  comments: string;
  rating: number;
  createdAt: Date | number;
  updatedAt?: Date | number;
}
