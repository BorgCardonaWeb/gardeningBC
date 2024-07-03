import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), MdbModalService]
};



