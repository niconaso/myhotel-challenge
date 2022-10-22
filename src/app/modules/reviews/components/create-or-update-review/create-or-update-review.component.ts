import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  AddReview,
  SetSelectedReview,
  UpdateReview
} from '@modules/reviews/actions';
import { Review } from '@modules/reviews/models';
import { ReviewState } from '@modules/reviews/states';
import { Select, Store } from '@ngxs/store';
import { EmailValidators } from 'ngx-validators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'create-or-update-review',
  templateUrl: './create-or-update-review.component.html',
  styleUrls: ['./create-or-update-review.component.scss'],
})
export class CreateOrUpdateReviewComponent implements OnInit, OnDestroy {
  @Select(ReviewState.getSelectedReview)
  selectedReview!: Observable<Review>;

  reviewForm!: FormGroup;
  editReview: boolean = false;

  private _reviewId!: string | undefined;
  private _subscriptions: Subscription = new Subscription();

  /**
   * Creates an instance of CreateOrUpdateReviewComponent.
   * @param {FormBuilder} _fb
   * @param {MatDialogRef<CreateOrUpdateReviewComponent>} _matDialogRef
   * @param {Store} _store
   * @memberof CreateOrUpdateReviewComponent
   */
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _matDialogRef: MatDialogRef<CreateOrUpdateReviewComponent>,
    private readonly _store: Store
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  async onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    const review: Review = {
      ...form.value,
    };

    if (this.editReview) {
      this._subscriptions.add(
        this._store
          .dispatch(new UpdateReview(review, this._reviewId))
          .subscribe(() => {
            this.clearForm();
            this._matDialogRef.close();
          })
      );
    } else {
      this._subscriptions.add(
        this._store.dispatch(new AddReview(review)).subscribe(() => {
          this.clearForm();
          this._matDialogRef.close();
        })
      );
    }
  }
  private clearForm() {
    this.reviewForm.reset();
    this._store.dispatch(new SetSelectedReview(null));
  }

  private initForm() {
    this.reviewForm = this._fb.group({
      firstName: this._fb.control('', [Validators.required]),
      lastName: this._fb.control('', [Validators.required]),
      email: this._fb.control('', [
        Validators.required,
        EmailValidators.normal,
      ]),
      comments: this._fb.control('', []),
      rating: this._fb.control(0, []),
    });

    this.selectedReview.subscribe((review: Review) => {
      if (review) {
        this._reviewId = review.id;
        // If the user is editing a Review then fill the form with the values
        this.reviewForm.patchValue(review);
        this.reviewForm.updateValueAndValidity();

        this.editReview = true;
      } else {
        this.editReview = false;
      }
    });
  }
}
