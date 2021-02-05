import { NgModule, ErrorHandler, Pipe } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';


import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '@ecoinsoft/core-frontend/src/lib/shared/inmemory-db/inmemory-db.service';

import { rootRouterConfig } from './app.routing';

import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandlerService } from '@ecoinsoft/core-frontend/src/lib/shared/services/error-handler.service';

import { Environment} from '@ecoinsoft/core-frontend/src/lib/environments/environment';
import { environment } from 'environments/environment';
import { CoreFrontendModule } from '@ecoinsoft/core-frontend/src/public-api';
import {AppLoaderComponent} from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.component';
import {MessageTemplateModule} from './message-template/message-template.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MessageTemplateModule,
    HttpClientModule,
    PerfectScrollbarModule,
    CoreFrontendModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    },
    ),
    InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true}),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    


  ],
  declarations: [
    AppComponent
    
  ],

  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: Environment, useValue: environment }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppLoaderComponent
  ],

})
export class AppModule { }
