import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    credential: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  
  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit(): void {
    console.log("Checking");
    console.log(this.loginForm.valid);
    console.log(this.loginForm.valid);
    if (this.loginForm.invalid) {
      console.log("Please enter credetial and password !");
      return;
    }
    // ToDo Api
    let credential = this.loginForm.value.credential;
    let password = this.loginForm.value.password;

    console.log(credential);
    console.log(password);
    this.userService.login(credential, password).subscribe(
      response => {
        console.log("repons");
        console.log(response);

        let token: string = response.accessToken.token;
        let expire: Date = new Date(response.accessToken.exp);
        localStorage.setItem('token', token);
        this.cookieService.set('Token', token, expire);
        let cookie: string = this.cookieService.get('Token');
        this.router.navigate(['/profile']);
        let cookieAll: { [data: string]: string } = this.cookieService.getAll();
        console.log(token);
        console.log(expire);
        console.log("this is : " + cookie);
        console.log("this is cookieAll :" + cookieAll)
      },
      error => {
        console.log(error);
      }
    )
    
  }

}
