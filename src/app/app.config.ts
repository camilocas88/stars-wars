import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { STARWARS_PORT_TOKEN } from './domain/ports/star-wars.port';
import { StarWarsApiService } from './infrastructure/services/star-wars-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: STARWARS_PORT_TOKEN, useClass: StarWarsApiService },
    provideHttpClient(withInterceptorsFromDi())
  ]
};
