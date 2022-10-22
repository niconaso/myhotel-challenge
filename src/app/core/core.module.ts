import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

const MODULES: any[] = [
  HttpClientModule,
  NgxsModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsLoggerPluginModule.forRoot(),
];

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
