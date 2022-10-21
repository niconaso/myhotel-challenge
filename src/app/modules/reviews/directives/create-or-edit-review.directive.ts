import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateReviewComponent } from '../components';
import { Review } from '../models';

@Directive({
  selector: '[appCreateOrEditReview]',
})
export class CreateOrEditReviewDirective {
  @Input() review?: Review;

  /**
   * Creates an instance of AddReviewDirective.
   * @param {MatDialog} _modalService
   * @memberof AddReviewDirective
   */
  constructor(private _modalService: MatDialog) {}

  @HostListener('click')
  openReviewModal() {
    const modalRef = this._modalService.open(CreateOrUpdateReviewComponent, {
      data: {
        review: this.review,
      },
    });

    modalRef.afterClosed().subscribe();

    return modalRef;
  }
}
