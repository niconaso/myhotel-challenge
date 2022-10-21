import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewComponent } from '../components';

@Directive({
  selector: '[appAddReview]',
})
export class AddReviewDirective {
  /**
   * Creates an instance of AddReviewDirective.
   * @param {MatDialog} _modalService
   * @memberof AddReviewDirective
   */
  constructor(private _modalService: MatDialog) {}

  @HostListener('click')
  openReviewModal() {
    const modalRef = this._modalService.open(AddReviewComponent);

    modalRef.afterClosed().subscribe();

    return modalRef;
  }
}
