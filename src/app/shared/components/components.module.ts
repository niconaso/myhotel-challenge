import { NgModule } from '@angular/core';
import { ConfirmationDialogModule } from './confirmation-dialog/confirmation-dialog.module';
import { RatingEmojiModule } from './rating-emoji/rating-emoji.module';
import { RatingModule } from './rating/rating.module';

const MODULES: any[] = [
  RatingModule,
  RatingEmojiModule,
  ConfirmationDialogModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class ComponentsModule {}
