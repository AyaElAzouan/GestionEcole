import { ApplicationConfig ,provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import { provideHttpClient,withInterceptors} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { demoInterceptor } from './demo.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    importProvidersFrom([BrowserAnimationsModule]),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([demoInterceptor])),
    provideToastr({positionClass:'toast-top-center',timeOut:5000}), provideAnimationsAsync()
  ]
};










