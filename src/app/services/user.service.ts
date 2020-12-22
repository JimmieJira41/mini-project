import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

// import { IAccessToken } from '../pages/interfaces/i-access-token';
import { IloginResponse } from '../pages/interfaces/i-login-response';
import { IModelUser } from '../pages/interfaces/i-user-model';
import { ICustomerModel } from '../pages/interfaces/i-customer-model';
import { IAddressModel } from '../pages/interfaces/i-address-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  public login(credential: string, password: string): Observable<IloginResponse> {
    // let url = "http://localhost:8080/authentication/login";
    let url = "https://cry-by-test-backend.herokuapp.com/authentication/login";
    let body = {
      credential: credential,
      password: password
    }
    return this.http.post<IloginResponse>(url, body);
  }

  // https://cry-by-test-backend.herokuapp.com/
  public getProfile(): Observable<IModelUser> {
    let token: string = this.cookieService.get('Token');
    console.log("this token in getporfile" + "  " + token);
    // let url = "http://localhost:8080/authentication/profile";
    let url = "https://cry-by-test-backend.herokuapp.com/authentication/profile";
    return this.http.get<IModelUser>(url);
  }


  public updateProfile(updateProfile: FormData): Observable<IModelUser> {
    // let url = "http://localhost:8080/user/update";
    let url = "https://cry-by-test-backend.herokuapp.com/user/update";
    // let body = {
    //   id: updateProfile.id,
    //   username: updateProfile.username,

    //   email: updateProfile.email,
    //   firstname: updateProfile.firstname,
    //   lastname: updateProfile.lastname
    // }
    return this.http.put<IModelUser>(url, updateProfile);
  }


  public updatePassword(passwordData: Object): Observable<any> {
    // let url = "http://localhost:8080/user/update-password";
    let url = "https://cry-by-test-backend.herokuapp.com/user/update-password";

    return this.http.put<any>(url, passwordData);
  }


  public getListCustomer(): Observable<ICustomerModel[]> {
    // let url = "http://localhost:8080/customer/all";
    let url = "https://cry-by-test-backend.herokuapp.com/customer/all";
    return this.http.get<ICustomerModel[]>(url);
  }



  public getProfileCustomer(id: string): Observable<ICustomerModel> {
    // let id = JSON.stringify(idCustomer);
    // let params = new HttpParams().append("id",id);
    let option = {
      params: new HttpParams().set('id', id)
    }
    // let url = "http://localhost:8080/customer/get/"
    let url = "https://cry-by-test-backend.herokuapp.com/customer/get/"
    return this.http.get<ICustomerModel>(url, option);
  }


  public updateProfileCustomer(detail: object): Observable<ICustomerModel> {
    // let url = "http://localhost:8080/customer/update"
    let url = "https://cry-by-test-backend.herokuapp.com/customer/update"
    console.log(detail);
    return this.http.put<ICustomerModel>(url, detail);
  }
  public register(detail: object): Observable<ICustomerModel> {
    // let url = "http://localhost:8080/user/register"
    let url = "https://cry-by-test-backend.herokuapp.com/customer/register"
    return this.http.post<ICustomerModel>(url, detail);
  }

  public createCustomer(profileCustomer: object): Observable<ICustomerModel>{
    // let url = "http://localhost:8080/customer/create"
    let url = "https://cry-by-test-backend.herokuapp.com/customer/create"
    return this.http.post<ICustomerModel>(url,profileCustomer);
  }

  public deleteCustomer(idCustomer: string): Observable<ICustomerModel> {
    // let url = "http://localhost:8080/customer/delete"
    let url = "https://cry-by-test-backend.herokuapp.com/customer/delete"
    let option = {
      // observe : new Observable<ICustomerModel>().subscribe(
      //   observe
      // )
      params: new HttpParams().set("idCustomer",idCustomer)
    }
    return this.http.delete<ICustomerModel>(url,option)
  }
  public fetchAddress(customerId: string): Observable<IAddressModel[]>{
    // let url = "http://localhost:8080/address/fetch";
    let url = "https://cry-by-test-backend.herokuapp.com/address/fetch"
    let option = {
      params: new HttpParams().set("customerId",customerId)
    }
    return this.http.get<IAddressModel[]>(url,option);
    }
  public createAddress(detailAddress: object): Observable<IAddressModel>{
    // let url = "http://localhost:8080/address/create";
    let url = "https://cry-by-test-backend.herokuapp.com/address/create"
    return this.http.post<IAddressModel>(url,detailAddress);
  }
  public deleteAddress(customerId: string): Observable<IAddressModel>{
    // let url = "http://localhost:8080/address/delete";
    let url = "https://cry-by-test-backend.herokuapp.com/address/delete"
    let option = {
      params: new HttpParams().set("customerId",customerId)
    }
    return this.http.delete<IAddressModel>(url,option);
  }
}

