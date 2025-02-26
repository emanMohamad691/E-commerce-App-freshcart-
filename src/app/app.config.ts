import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { api_url } from './core/customer_injection/api_url';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { spinerInterceptor } from './core/interceptors/spiner/spiner.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor,spinerInterceptor])),provideAnimations(),
    provideToastr(),
    {
      provide:api_url,
      useValue:'https://ecommerce.routemisr.com/api/v1'
    },
    importProvidersFrom(NgxSpinnerModule)
  ]
};
