import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './services/auth.interceptor';
import { UpdateComponent } from './pages/update/update.component';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { UpdateCustomerComponent } from './pages/update-customer/update-customer.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ViewCustomerComponent } from './pages/view-customer/view-customer.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './pages/register/register.component';
// import { AppComponent } from './app.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';
import { NewAddressComponent } from './pages/new-address/new-address.component';
import { CustomerListItemComponent } from './pages/customer/component/customer-list-item/customer-list-item.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AddressListItemComponent } from './pages/view-customer/component/address-list-item/address-list-item.component';
import { UpdateAddressComponent } from './pages/update-address/update-address.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RxComponent } from './test/rx/rx.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MetaModule } from '@ngx-meta/core';


export function tokenGetter() {
  return localStorage.getItem('token');
}

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent,
    UpdateComponent,
    UploadImageComponent,
    CustomerComponent,
    UpdateCustomerComponent,
    ViewCustomerComponent,
    UpdatePasswordComponent,
    NavbarComponent,
    RegisterComponent,
    NewCustomerComponent,
    NewAddressComponent,
    CustomerListItemComponent,
    FooterComponent,
    AddressListItemComponent,
    UpdateAddressComponent,
    RxComponent
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CollapseModule.forRoot(),
    SweetAlert2Module.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
    MetaModule.forRoot(),
    NgbModule,
  ],
  providers: [CookieService, MatDatepickerModule, MatNativeDateModule, MatToolbarModule, MatIconModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
