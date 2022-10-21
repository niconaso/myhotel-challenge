import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Review } from '@modules/reviews/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as uuid from 'uuid';

const REVIEW_MOCK_DATA: Review[] = [
  {
    id: '54a9bce0-1028-4d72-8b88-a2b7fababdc1',
    firstName: 'Nicolas',
    lastName: 'Naso',
    comments: 'This place is beautiful!',
    rating: 5,
    createdAt: 1666360618368,
  },
];
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private _reviewsBS: BehaviorSubject<Review[]> = new BehaviorSubject<Review[]>(
    [...REVIEW_MOCK_DATA]
  );

  private reviews$: Observable<Review[]> = this._reviewsBS.asObservable();
  /**
   *
   *
   * @private
   * @type {string}
   * @memberof ReviewService
   */
  private readonly _endpoint: string = `${environment.endpoints.url}/reviews`;

  /**
   * Creates an instance of ReviewService.
   * @param {HttpClient} _http
   * @memberof ReviewService
   */
  constructor(private readonly _http: HttpClient) {}

  /**
   * Persists a new review to the database
   *
   * @param {Review} review
   * @return {*}  {Observable<Review>}
   * @memberof ReviewService
   */
  create(review: Review): Observable<Review> {
    const newReview: Review = {
      ...review,
      id: uuid.v4(),
      createdAt: new Date().getTime(),
    };
    // return this._http.post<Review>(this._endpoint, newReview);

    this.addReview(newReview);
    return of(newReview);
  }

  private addReview(newReview: Review) {
    const reviews: Review[] = [...this._reviewsBS.value, newReview];

    this._reviewsBS.next(reviews);
  }

  /**
   * Retrieves all the reviews from the database
   *
   * @return {*}  {Observable<Review[]>}
   * @memberof ReviewService
   */
  getAll(): Observable<Review[]> {
    // return this._http.get<Review[]>(this._endpoint);
    return this.reviews$;
  }
}
