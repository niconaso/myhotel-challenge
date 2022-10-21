import { NgModule } from '@angular/core';
import { RatingEmojiModule } from './rating-emoji/rating-emoji.module';
import { RatingModule } from './rating/rating.module';

const MODULES: any[] = [RatingModule, RatingEmojiModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class ComponentsModule {}
