import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
} from '@shared/components';
import { Review } from '../models';
import { ReviewService } from '../services';

@Directive({
  selector: '[appDeleteReview]',
})
export class DeleteReviewDirective {
  /**
   * Review to delete
   *
   * @type {Review}
   * @memberof DeleteReviewDirective
   */
  @Input() review!: Review;

  /**
   * Creates an instance of DeleteReviewDirective.
   * @param {MatDialog} _matDialog
   * @param {ReviewService} _reviewService
   * @memberof DeleteReviewDirective
   */
  constructor(
    private readonly _matDialog: MatDialog,
    private readonly _reviewService: ReviewService
  ) {}

  @HostListener('click')
  onDeleteReviewClick() {
    const data: ConfirmationDialogData = {
      title: 'Delete Review',
      message: 'Would you like to delete the review?',
    };

    const dialogRef: MatDialogRef<ConfirmationDialogComponent> =
      this._matDialog.open(ConfirmationDialogComponent, {
        data,
      });

    dialogRef
      .afterClosed()
      .subscribe((confirmed) => confirmed && this.deleteReview());
  }

  private deleteReview() {
    this._reviewService.remove(this.review).subscribe();
  }
}
