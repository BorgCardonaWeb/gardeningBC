import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LocalStorageService } from './services/local-storage.service';
import { FilterCategoriesService } from './services/filter-categories.service';
import { UserManagementService } from './services/user-management.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), MdbModalService, FilterCategoriesService, LocalStorageService, UserManagementService]
};



