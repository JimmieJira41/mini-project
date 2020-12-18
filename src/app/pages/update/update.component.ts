import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private userService: UserService) { }
  flagUpdate: boolean = false;
  profile = {
    id: "",
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    image: ""
  }

  updateProfileForm = new FormGroup({
    id: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl({ value: '', disabled: true }),
    email: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    imageFile: new FormControl(''),
    imageFileSource: new FormControl('')
  })



  ngOnInit(): void {
    this.userService.getProfile().subscribe(
      response => {
        Object.assign(this.updateProfileForm, response)
        this.updateProfileForm.controls.id.setValue(response.id)
        this.updateProfileForm.controls.username.setValue(response.username)
        this.updateProfileForm.controls.password.setValue(response.password)
        this.updateProfileForm.controls.email.setValue(response.email)
        this.updateProfileForm.controls.firstname.setValue(response.firstname)
        this.updateProfileForm.controls.lastname.setValue(response.lastname)
      },
      error => {
        console.log(error);
      }
    )
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      this.updateProfileForm.patchValue({
        imageFileSource: imageFile
      })
    }

  }

  onSubmitUpdateProfile(): void {
    const formData: any = new FormData();
    if (this.updateProfileForm.value.id != null) {
      this.profile.id = this.updateProfileForm.value.id
    }
    if (this.updateProfileForm.value.username != null) {
      this.profile.username = this.updateProfileForm.value.username
    }
    if (this.updateProfileForm.value.password != null) {
      this.profile.password = this.updateProfileForm.value.password
    }
    if (this.updateProfileForm.value.email != null) {
      this.profile.email = this.updateProfileForm.value.email

    }
    if (this.updateProfileForm.value.firstname != null) {
      this.profile.firstname = this.updateProfileForm.value.firstname
    }
    if (this.updateProfileForm.value.lastname != null) {
      this.profile.lastname = this.updateProfileForm.value.lastname
    }
    const profileUpdate = JSON.stringify(this.profile);
    const blob = new Blob([profileUpdate],{
      type: 'application/json'
    })

    console.log(this.profile);
    formData.append("profile", blob);
    formData.append("file", this.updateProfileForm.controls.imageFileSource.value);

    console.log("profile update : " + this.profile)
    console.log("updateProfileForm : " + this.updateProfileForm.controls.imageFileSource.value)
    this.userService.updateProfile(formData).subscribe(
      reponse => {
        Object.assign(this.profile, reponse)
        this.profile.id = reponse.id;
        this.profile.username = reponse.username;
        this.profile.password = reponse.password;
        this.profile.email = reponse.email;
        this.profile.firstname = reponse.firstname;
        this.profile.lastname = reponse.lastname;
        this.profile.image = reponse.image;
        this.flagUpdate = true;
      },
      error => {
        console.log(error);
      }
    )
  }

}
