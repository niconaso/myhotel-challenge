import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from '@modules/reviews/models';
import { ReviewService } from '@modules/reviews/services';
import { EmailValidators } from 'ngx-validators';
import { Subscription } from 'rxjs';
import { CreateOrUpdateReviewData } from './create-or-update-review.interface';

@Component({
  selector: 'create-or-update-review',
  templateUrl: './create-or-update-review.component.html',
  styleUrls: ['./create-or-update-review.component.scss'],
})
export class CreateOrUpdateReviewComponent implements OnInit, OnDestroy {
  reviewForm!: FormGroup;

  private _subscriptions: Subscription = Subscription.EMPTY;

  /**
   * Creates an instance of CreateOrUpdateReviewComponent.
   * @param {FormBuilder} _fb
   * @param {MatDialogRef<CreateOrUpdateReviewComponent>} _matDialogRef
   * @memberof CreateOrUpdateReviewComponent
   */
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _matDialogRef: MatDialogRef<CreateOrUpdateReviewComponent>,
    private readonly _reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) public data: CreateOrUpdateReviewData
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Unsubscribe from all the observable to avoid memory leaks.
   *
   * @memberof CreateOrUpdateReviewComponent
   */
  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  async onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    const review: Review = {
      ...this.data?.review,
      ...form.value,
    };

    this._subscriptions.add(
      this._reviewService
        .createOrUpdate(review)
        .subscribe(() => this._matDialogRef.close())
    );
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

    if (this.data) {
      this.reviewForm.patchValue({
        ...this.data.review,
      });
      this.reviewForm.updateValueAndValidity();
    }
  }
}
