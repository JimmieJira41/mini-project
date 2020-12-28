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
    component: LoginComponent,
    canActivate: [MetaGuard],
    data:{
      meta:{
        title: "Customer app || Login page",
        description: "This page is about login to admin page",
        image: "./assets/image.png"
      }
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard, MetaGuard],
    data:{
      meta:{
        title: "Customer app || Profile page",
        description: "This page is about profile admin",
        image: "./assets/image.png"
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
        description: "This page is about form update profile admin",
        image: "./assets/image.png"
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
        description: "This page is about dashboard",
        image: "./assets/image.png"
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
        description: "This page is about form customer list",
        image: "./assets/image.png"
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
        description: "This page is about form detail customer",
        image: "./assets/image.png"
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
        description: "This page is about form form update customer",
        image: "./assets/image.png"
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
        description: "This page is about form reset password admin",
        image: "./assets/image.png"
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
        description: "This page is about form create new customer",
        image: "./assets/image.png"
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
        description: "This page is about form new address",
        image: "./assets/image.png"
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
        description: "This page is about form update address",
        image: "./assets/image.png"
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