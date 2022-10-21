import { NgModule } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

const MODULES: any[] = [FontAwesomeModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class FortAwesomeModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
