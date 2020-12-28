import { Injectable } from '@angular/core';
// import { from } from 'rxjs';
// imcdport { Observable } from 'rxjs-compat/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/delay';
import { JwtHelperService } from '@auth0/angular-jwt'
import { CookieService } from 'ngx-cookie-service';
// import { from, Observable } from 'rxjs';

@Injectable(
  { providedIn: 'root' }
)
export class AuthService {
  // public isLoggedIn:boolean = false;
  // public redirectUrl:string | undefined;

  constructor(public jwtHelper: JwtHelperService,private cookieService:CookieService) { }

  // public login(): Observable<boolean>{
  //   return Observable.of(true)
  //   .delay(3000)
  //   .do(val => this.isLoggedIn = true);
  // }

  // public logout(): void{
  //   this.isLoggedIn = false;
  // }
  public isAuthenticated(): boolean {
    const token: any = this.cookieService.get('Token');
    // console.log(token);
    return !this.jwtHelper.isTokenExpired(token);
  }
}
