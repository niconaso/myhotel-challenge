import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Review } from '@modules/reviews/models';
import { BehaviorSubject, Observable, of, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  /**
   * BehaviorSubject to manage the reactive states of the Reviews
   *
   * @private
   * @type {BehaviorSubject<Review[]>}
   * @memberof ReviewService
   */
  private _reviewsBS: BehaviorSubject<Review[]> = new BehaviorSubject<Review[]>(
    []
  );

  private reviews$: Observable<Review[]> = this._reviewsBS.asObservable();

  /**
   * Reviews endpoint
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
    // Following the REST practices returns only the update review object
    return this._http.post<Review>(this._endpoint, review).pipe(
      // Add new review to the observable
      tap((createdReview: Review) => {
        const reviews: Review[] = [...this._reviewsBS.value, createdReview];
        this._reviewsBS.next(reviews);
      }),
      take(1)
    );
  }

  /**
   * Retrieves all the reviews from the "database"
   *
   * @return {*}  {Observable<Review[]>}
   * @memberof ReviewService
   */
  getAll(): Observable<Review[]> {
    return this._http.get<Review[]>(this._endpoint).pipe(
      tap((reviews: Review[]) => this._reviewsBS.next(reviews)),
      switchMap(() => this.reviews$)
    );
  }

  /**
   * Updates an existing review from the "database"
   *
   * @param {Review} review
   * @return {*}  {Observable<Review>}
   * @memberof ReviewService
   */
  update(review: Review): Observable<Review> {
    const url: string = `${this._endpoint}/${review.id}`;

    return this._http.put<Review>(url, review).pipe(
      tap((updatedReview: Review) => {
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
      })
    );
  }

  /**
   * Delete a review from the "database"
   *
   * @param {Review} deleteReview
   * @return {*}  {Observable<Review>}
   * @memberof ReviewService
   */
  remove(review: Review): Observable<Review> {
    const { id } = review;
    const url: string = `${this._endpoint}/${id}`;

    return this._http.delete<Review>(url).pipe(
      tap(() => {
        // Remove the review
        const reviews: Review[] = [...this._reviewsBS.value].filter(
          (review: Review) => review.id !== id
        );

        this._reviewsBS.next(reviews);
      }),
      take(1)
    );
  }
}
