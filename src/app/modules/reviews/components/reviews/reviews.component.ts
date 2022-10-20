import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Review } from '@modules/reviews/models';
import { ReviewService } from '@modules/reviews/services';
import { Observable } from 'rxjs';
import { AddReviewComponent } from '../add-review/add-review.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  reviews$!: Observable<Review[]>;

  constructor(
    private readonly _reviewService: ReviewService,
    private _modalService: MatDialog
  ) {}

  ngOnInit(): void {
    this.reviews$ = this._reviewService.getAll();
  }

  openReviewModal() {
    const modalRef = this._modalService.open(AddReviewComponent);

    modalRef.afterClosed().subscribe();

    return modalRef;
  }
}
