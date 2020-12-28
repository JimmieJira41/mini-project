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
import { UpdateAddressComponent } from './pages/update-address/update-address.component';
import { RxComponent } from './test/rx/rx.component';
import { MetaGuard } from '@ngx-meta/core';
import { Meta } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard, MetaGuard],
    data:{
      meta:{
        title: "Customer app || Profile page",
        description: "This page is about profile admin"
      }
    }
  },
  {
    path: 'update',
    component: UpdateComponent,
    canActivate: [AuthGuard, MetaGuard],
    data:{
      meta:{
        title: "Customer app || Update Profile page",
        description: "This page is about form update profile admin"
      }
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, MetaGuard],
    data:{
      meta:{
        title: "Customer app || Dashboard page",
        description: "This page is about dashboard"
      }
    }
  },
  {
    path: "customer",
    component: CustomerComponent,
    canActivate: [AuthGuard, MetaGuard],
    data:{
      meta:{
        title: "Customer app || Customer page",
        description: "This page is about form customer list"
      }
    }
  },
  {
    path: "view-customer/:id",
    component: ViewCustomerComponent,
    canActivate: [AuthGuard, MetaGuard],
    data:{
      meta:{
        title: "Customer app || Customer page",
        description: "This page is about form detail customer"
      }
    }
  },
  {
    path: "update-customer/:idCustomer",
    component: UpdateCustomerComponent,
    canActivate: [AuthGuard, MetaGuard],
    data:{
      meta:{
        title: "Customer app || Update Customer page",
        description: "This page is about form form update customer"
      }
    }
  },
  {
    path: "update-password",
    component: UpdatePasswordComponent,
    canActivate: [AuthGuard, MetaGuard],
    data:{
      meta:{
        title: "Customer app || Admin page",
        description: "This page is about form reset password admin"
      }
    }
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "new-customer",
    component: NewCustomerComponent,
    canActivate: [AuthGuard, MetaGuard],
    data:{
      meta:{
        title: "Customer app || Customer page",
        description: "This page is about form create new customer"
      }
    }
  },
  {
    path: "new-address/:id",
    component: NewAddressComponent,
    canActivate: [AuthGuard, MetaGuard],
    data:{
      meta:{
        title: "Customer app || Address page",
        description: "This page is about form new address"
      }
    }
  },
  {
    path: "update-address/:customerId/:addressId",
    component: UpdateAddressComponent,
    canActivate: [AuthGuard, MetaGuard],
    data:{
      meta:{
        title: "Customer app || Address page",
        description: "This page is about form update address"
      }
    }
  },
  {
    path: "testRx",
    component: RxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }