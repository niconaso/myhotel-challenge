import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailValidators } from 'ngx-validators';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent implements OnInit {
  reviewForm!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _matDialogRef: MatDialogRef<AddReviewComponent>
  ) {}

  ngOnInit(): void {
    this.reviewForm = this._fb.group({
      firstName: this._fb.control('', [Validators.required]),
      lastName: this._fb.control('', [Validators.required]),
      email: this._fb.control('', [Validators.required, EmailValidators.normal]),
      comments: this._fb.control('', []),
      rating: this._fb.control(0, []),
    });
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    console.log(form.value);

    this._matDialogRef.close();
  }
}
