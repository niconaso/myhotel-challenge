import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsModule } from 'ngx-validators';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './material.module';

const MODULES: any[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  ValidatorsModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
