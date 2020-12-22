import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UpdateComponent } from './pages/update/update.component';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { UpdateCustomerComponent } from './pages/update-customer/update-customer.component';
import { ViewCustomerComponent } from './pages/view-customer/view-customer.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';
import { NewAddressComponent } from './pages/new-address/new-address.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'update',
    component:UpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: "upload-image",
    component: UploadImageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customer",
    component: CustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "view-customer/:id",
    component: ViewCustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "update-customer/:idCustomer",
    component: UpdateCustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "update-password",
    component: UpdatePasswordComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "new-customer",
    component: NewCustomerComponent,
    canActivate: [AuthGuard]
  } ,
  {
    path: "new-address/:id",
    component: NewAddressComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }