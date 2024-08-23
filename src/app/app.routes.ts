import { Routes } from '@angular/router';
import { HomePageComponent } from './features/components/home-page/home-page.component';
import { UserOrdersComponent } from './features/components/user-orders/user-orders.component';
import { UserInfoComponent } from './features/components/user-info/user-info.component';

export const routes: Routes = [
    {path:'home', component: HomePageComponent},
    {path:'orders', component: UserOrdersComponent},  
    {path:'user', component: UserInfoComponent},  
    {path:'', redirectTo: '/home', pathMatch:'full'}
];
