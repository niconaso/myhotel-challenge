export interface Review {
  id?: string;
  firstName: string;
  lastName: string;
  comments: string;
  rating: number;
  createdAt: Date | number;
}
