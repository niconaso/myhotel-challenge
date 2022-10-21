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
      createdAt: new Date().getTime(),
    };
    return this._http.post<Review>(this._endpoint, newReview);
  }

  /**
   * Retrieves all the reviews from the database
   *
   * @return {*}  {Observable<Review[]>}
   * @memberof ReviewService
   */
  getAll(): Observable<Review[]> {
    return this._http.get<Review[]>(this._endpoint);
  }
}
