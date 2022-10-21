import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Review } from '@modules/reviews/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as uuid from 'uuid';

const ReviewsJsonMockData = require('../../../../assets/mock/reviews.json');

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private _reviewsBS: BehaviorSubject<Review[]> = new BehaviorSubject<Review[]>(
    [...ReviewsJsonMockData]
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
  constructor(private readonly _http: HttpClient) {
  }

  /**
   * Creates or Updates the review
   *
   * @param {Review} review
   * @return {*}  {Observable<Review>}
   * @memberof ReviewService
   */
  createOrUpdate(review: Review): Observable<Review> {
    // If the id is set then update the review
    if (review.id) {
      return this.update(review);
    }
    // Otherwise create a new review
    else {
      return this.create(review);
    }
  }

  /**
   * Persists a new review to the database
   *
   * @param {Review} review
   * @return {*}  {Observable<Review>}
   * @memberof ReviewService
   */
  create(review: Review): Observable<Review> {
    // Set the ID and Creation Date
    const newReview: Review = {
      ...review,
      id: uuid.v4(),
      createdAt: new Date().getTime(),
    };
    // return this._http.post<Review>(this._endpoint, newReview);

    // Add new review to the observable
    const reviews: Review[] = [...this._reviewsBS.value, newReview];
    this._reviewsBS.next(reviews);

    // Returns only the created review object
    return of(newReview);
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

  update(review: Review): Observable<Review> {
    const updatedReview: Review = {
      ...review,
      updatedAt: new Date().getTime(),
    };

    // Update the existing review
    const reviews: Review[] = [...this._reviewsBS.value].map(
      (review: Review) => {
        if (review.id === updatedReview.id) {
          review = {
            ...review,
            ...updatedReview,
          };
        }
        return review;
      }
    );

    this._reviewsBS.next(reviews);

    // Returns only the update review object
    return of(updatedReview);
  }
}
