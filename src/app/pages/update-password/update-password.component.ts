import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private userService: UserService) { }

  updatePassword = new FormGroup({
    newPassword: new FormControl('', Validators.required),
    newPasswordConfirm: new FormControl('', Validators.required),
    oldPassword: new FormControl('', Validators.required)
  })

  passwordData = {
    newPassword: "",
    newPasswordConfirm: "",
    oldPassword: ""
  }


  ngOnInit(): void {
  }

  onSubmitUpadtePassword() {
    if (this.updatePassword.value.newPassword == this.updatePassword.value.newPasswordConfirm) {
      this.passwordData.newPassword = this.updatePassword.value.newPassword;
      this.passwordData.newPasswordConfirm = this.updatePassword.value.newPasswordConfirm;
      this.passwordData.oldPassword = this.updatePassword.value.oldPassword;

      this.userService.updatePassword(this.passwordData).subscribe(
        response => {
          if (response.flag == 1) {
            Swal.fire(
              "Successful",
              response.notify,
              "success"
            )
          } else {
            Swal.fire(
              "Fail",
              response.notify,
              "warning"
            )
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      Swal.fire(
        'Oh no !',
        "Your new password not match new password confirm, please check it !",
        "warning"
      )
    }
  }

}
