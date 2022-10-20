export interface Review {
  id?: number;
  name: string;
  comments: string;
  rating: number;
  createdAt: Date | number;
}
