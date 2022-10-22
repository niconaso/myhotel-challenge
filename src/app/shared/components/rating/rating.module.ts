import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FortAwesomeModule } from '@shared/fort-awesome.module';
import { RatingComponent } from './rating.component';

const MODULES: any[] = [CommonModule, FormsModule, ReactiveFormsModule, FortAwesomeModule];
const COMPONENTS: any[] = [RatingComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS],
})
export class RatingModule {}
