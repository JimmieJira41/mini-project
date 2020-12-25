import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private route: Router) { }

  registerData = {
    username: "",
    password: ""
  }

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })
  ngOnInit(): void {
  }

  onSubmitRegister() {
    this.registerData.username = this.registerForm.value.username;
    this.registerData.password = this.registerForm.value.password;
    this.userService.register(this.registerData).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          title: "Oh yeah",
          text: "Create new user success!",
          icon: "success"
        }).then(confirm => {
          if (confirm) {
            this.route.navigate([""]);
          }
        })
      },
      error => {
        console.log(error);
        Swal.fire({
          title: "Oh no !",
          text: "Please check your username and password",
          icon: "warning"
        })
      }
    )
  }

}
