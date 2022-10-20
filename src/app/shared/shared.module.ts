import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsModule } from 'ngx-validators';
import { RatingModule } from './components/rating/rating.module';
import { MaterialModule } from './material.module';

const MODULES: any[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  ValidatorsModule,
  RatingModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
