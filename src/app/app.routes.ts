import { Routes } from '@angular/router';
import { HomePageComponent } from './features/components/home-page/home-page.component';
import { UserOrdersComponent } from './features/components/user-orders/user-orders.component';
import { UserInfoComponent } from './features/components/user-info/user-info.component';
import { CheckoutComponent } from './features/components/checkout/checkout.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'home', component: HomePageComponent},
    {path:'orders', component: UserOrdersComponent},  
    {path:'user', component: UserInfoComponent},  
    { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
    {path:'', redirectTo: '/home', pathMatch:'full'}
];
