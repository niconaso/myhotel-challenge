import { NgModule } from '@angular/core';
import { FortAwesomeModule } from '..';
import { RatingEmojiPipe } from './rating-emoji.pipe';

const PIPES: any[] = [RatingEmojiPipe];
const MODULES: any[] = [FortAwesomeModule];

@NgModule({
  declarations: [...PIPES],
  imports: [...MODULES],
  exports: [...PIPES],
})
export class PipesModule {}
