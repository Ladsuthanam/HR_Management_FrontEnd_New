import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom, NgModule } from '@angular/core';



const extendedAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })
    ),
  ],
};

bootstrapApplication(AppComponent, extendedAppConfig)
  .catch((err) => console.error(err));
