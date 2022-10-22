import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Review } from '@modules/reviews/models';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';
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
   * Persists a new review to the "database"
   *
   * @param {Review} review
   * @return {*}  {Observable<Review>}
   * @memberof ReviewService
   */
  create(review: Review): Observable<Review> {
    // Set the ID and Creation Date
    const newReview: Review = {
      ...review,
      // This is for demo purposes only, the ID and Creation Date should be set in the backend
      id: uuid.v4(),
      createdAt: new Date().getTime(),
    };

    // In case of using a backend uncomment the following line and remove the rest
    // return this._http.post<Review>(this._endpoint, newReview);

    // Add new review to the observable
    const reviews: Review[] = [...this._reviewsBS.value, newReview];
    this._reviewsBS.next(reviews);

    // Following the REST practives returns only the update review object
    return of(newReview);
  }

  /**
   * Retrieves all the reviews from the "database"
   *
   * @return {*}  {Observable<Review[]>}
   * @memberof ReviewService
   */
  getAll(): Observable<Review[]> {
   /*  return this._http.get<Review[]>(this._endpoint).pipe(
      tap((reviews: Review[])=> this._reviewsBS.next(reviews))
    ); */
     return this.reviews$;
  }

  /**
   * Updates an existing review from the "database"
   *
   * @param {Review} review
   * @return {*}  {Observable<Review>}
   * @memberof ReviewService
   */
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

    // Following the REST practives returns only the update review object
    return of(updatedReview);
  }

  /**
   * Delete a review from the "database"
   *
   * @param {Review} deleteReview
   * @return {*}  {Observable<Review>}
   * @memberof ReviewService
   */
  remove(deleteReview: Review): Observable<Review> {
    // Remove the review
    const reviews: Review[] = [...this._reviewsBS.value].filter(
      (review: Review) => review.id !== deleteReview.id
    );

    this._reviewsBS.next(reviews);

    return of(deleteReview).pipe(take(1));
  }
}
