import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Review } from '@modules/reviews/models';
import { ReviewService } from '@modules/reviews/services';
import { EmailValidators } from 'ngx-validators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent implements OnInit, OnDestroy {
  reviewForm!: FormGroup;

  private _subscriptions: Subscription = Subscription.EMPTY;

  /**
   * Creates an instance of AddReviewComponent.
   * @param {FormBuilder} _fb
   * @param {MatDialogRef<AddReviewComponent>} _matDialogRef
   * @memberof AddReviewComponent
   */
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _matDialogRef: MatDialogRef<AddReviewComponent>,
    private readonly _reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Unsubscribe from all the observable to avoid memory leaks.
   *
   * @memberof AddReviewComponent
   */
  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  async onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    const review: Review = form.value;

    this._subscriptions.add(
      this._reviewService
        .create(review)
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
  }
}
