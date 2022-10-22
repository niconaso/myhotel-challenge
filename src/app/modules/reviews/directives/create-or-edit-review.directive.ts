import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { SetSelectedReview } from '../actions';
import { CreateOrUpdateReviewComponent } from '../components';
import { Review } from '../models';

@Directive({
  selector: '[appCreateOrEditReview]',
})
export class CreateOrEditReviewDirective {
  @Input() review: Review | null = null;

  /**
   * Creates an instance of CreateOrEditReviewDirective.
   * @param {MatDialog} _modalService
   * @param {Store} _store
   * @memberof CreateOrEditReviewDirective
   */
  constructor(
    private _modalService: MatDialog,
    private readonly _store: Store
  ) {}

  @HostListener('click')
  openReviewModal() {
    this._store.dispatch(new SetSelectedReview(this.review)).subscribe(() => {
      const modalRef = this._modalService.open(CreateOrUpdateReviewComponent);

      modalRef.afterClosed().subscribe();

      return modalRef;
    });
  }
}
