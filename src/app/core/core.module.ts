import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

const MODULES: any[] = [HttpClientModule];

@NgModule({
  imports: [...MODULES],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }
}
