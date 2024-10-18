import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RoutesRecognized } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptorInterceptor } from './services/auth/token-interceptor.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideAnimations(),
  provideAnimationsAsync(),
  provideToastr({
    timeOut: 3000,
    tapToDismiss: true,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  }
  ),
  provideHttpClient(withInterceptors([tokenInterceptorInterceptor]))
  ]
};
