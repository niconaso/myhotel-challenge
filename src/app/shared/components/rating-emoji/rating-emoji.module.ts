import { NgModule } from '@angular/core';
import { FortAwesomeModule } from '@shared/fort-awesome.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { RatingEmojiComponent } from './rating-emoji.component';

const COMPONENTS: any[] = [RatingEmojiComponent];
const MODULES: any[] = [PipesModule, FortAwesomeModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS],
})
export class RatingEmojiModule {}
