import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Review } from '@modules/reviews/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
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
      return this.update(review, review.id);
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
    return this._http.post<Review>(this._endpoint, review);
  }

  /**
   * Retrieves all the reviews from the "database"
   *
   * @return {*}  {Observable<Review[]>}
   * @memberof ReviewService
   */
  getAll(): Observable<Review[]> {
    return this._http.get<Review[]>(this._endpoint);
  }

  /**
   * Updates an existing review from the "database"
   *
   * @param {Review} review
   * @return {*}  {Observable<Review>}
   * @memberof ReviewService
   */
  update(review: Review, id: string | undefined ): Observable<Review> {
    const url: string = `${this._endpoint}/${id}`;

    return this._http.put<Review>(url, review);
  }

  /**
   * Delete a review from the "database"
   *
   * @param {string} id
   * @return {*}  {Observable<Review>}
   * @memberof ReviewService
   */
  remove(id: string | undefined): Observable<Review> {
    const url: string = `${this._endpoint}/${id}`;

    return this._http.delete<Review>(url);
  }
}
