import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable(
  { providedIn: 'root' }
)
export class AuthGuardService implements CanActivate {
  // constructor(
  //   private AuthService: AuthService,
  //   private router: Router
  // ){}

  // canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
  //     console.log("canActivate run");
  //     let url: string = state.url;
  //     return this.checkLogin(url);
  // }

  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
  //   console.log('canActivateChild run');
  //   return this.canActivate(route, state);
  // }

  // checkLogin(url: string): boolean{
  //   if(this.AuthService.isLoggedIn){
  //     return true;
  //   }
  //   this.AuthService.redirectUrl = url;
  //   this.router.navigate(['']);
  //   return false;
  // }

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    console.log("I'm 1");
    let isActivate = this.auth.isAuthenticated();
    if (isActivate) {
      // this.router.navigate(['']);
      // return false;
     
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
    // this.router.navigate(['']);
  }
}
