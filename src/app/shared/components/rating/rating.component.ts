import { Component, forwardRef, Input, Provider } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

const RATING_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingComponent),
  multi: true,
};

const RATING_VALIDATORS: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RatingComponent),
  multi: true,
};

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [RATING_CONTROL_VALUE_ACCESSOR, RATING_VALIDATORS],
})
export class RatingComponent implements ControlValueAccessor, Validator {
  @Input() activeStars: number = 0;
  stars = [1, 2, 3, 4, 5];

  disabled: boolean = false;

  onChanged: any = () => {};
  onTouched: any = () => {};

  onStarClick(value: number) {
    if (this.disabled) {
      return;
    }

    this.onTouched();
    this.setStar(value);
    this.onChanged(value);
  }

  writeValue(value: number): void {
    this.setStar(value);
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return control.value ? null : { rating: true };
  }

  private setStar(starNum: number) {
    this.activeStars = starNum;
  }
}
