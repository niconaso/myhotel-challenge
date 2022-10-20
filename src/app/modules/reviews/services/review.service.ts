import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Review } from '@modules/reviews/models';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor() { }

  getAll(): Observable<Review[]> {
    return of([]);
  }
}
