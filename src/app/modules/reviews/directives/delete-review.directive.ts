import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
} from '@shared/components';
import { DeleteReview } from '../actions';
import { Review } from '../models';

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
   * @param {Store} _store
   * @memberof DeleteReviewDirective
   */
  constructor(
    private readonly _matDialog: MatDialog,
    private readonly _store: Store
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
    const { id } = this.review;

    this._store.dispatch(new DeleteReview(id));
  }
}
