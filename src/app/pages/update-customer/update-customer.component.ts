import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }
  profileCustomerUpdate = {
    id: "",
    firstName: "",
    lastName: "",
    weight: "",
    height: "",
    birthDay: "",
    age: "",
    gender: ""
    // address:{
    //   id: "",
    //   address: "",
    //   line1: "",
    //   line2: "",
    //   postalcode: ""
    // }
  }
  profileCustomerUpdateForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    weight: new FormControl(''),
    height: new FormControl(''),
    birthDay: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl('')
  })

  idCustomer: string = "";
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCustomer = params['idCustomer'];
      // console.log(params['idCustomer']);
    })
    console.log(this.route.snapshot.paramMap.get('idCustomer'));
    this.userService.getProfileCustomer(this.idCustomer).subscribe(
      response => {
        console.log(response.birthDay);
        this.profileCustomerUpdateForm.controls.firstName.setValue(response.firstName);
        this.profileCustomerUpdateForm.controls.lastName.setValue(response.lastName);
        this.profileCustomerUpdateForm.controls.weight.setValue(response.weight);
        this.profileCustomerUpdateForm.controls.height.setValue(response.height);
        this.profileCustomerUpdateForm.controls.birthDay.setValue(response.birthDay);
        this.profileCustomerUpdateForm.controls.age.setValue(response.age);
        this.profileCustomerUpdateForm.controls.gender.setValue(response.gender);
        console.log(response.firstName)
      },
      error => {
        console.log(error);
      }
    )
  }
  onSubmitUpdateProfileCustomer() {
    
    let birthDay = this.profileCustomerUpdateForm.value.birthDay;

    this.profileCustomerUpdate.id = this.idCustomer;
    this.profileCustomerUpdate.firstName = this.profileCustomerUpdateForm.value.firstName;
    this.profileCustomerUpdate.lastName = this.profileCustomerUpdateForm.value.lastName;
    this.profileCustomerUpdate.weight = this.profileCustomerUpdateForm.value.weight;
    this.profileCustomerUpdate.height = this.profileCustomerUpdateForm.value.height;
    this.profileCustomerUpdate.birthDay = birthDay;
    console.log(this.profileCustomerUpdate.birthDay);
    // this.profileCustomerUpdate.birthDay = this.profileCustomerUpdateForm.value.birthDay.substr(0,10);
    this.profileCustomerUpdate.age = this.profileCustomerUpdateForm.value.age;
    this.profileCustomerUpdate.gender = this.profileCustomerUpdateForm.value.gender;
    this.userService.updateProfileCustomer(this.profileCustomerUpdate).subscribe(
      response => {
        this.profileCustomerUpdateForm.controls.firstName.setValue(response.firstName);
        this.profileCustomerUpdateForm.controls.lastName.setValue(response.lastName);
        this.profileCustomerUpdateForm.controls.weight.setValue(response.weight);
        this.profileCustomerUpdateForm.controls.height.setValue(response.height);
        this.profileCustomerUpdateForm.controls.birthDay.setValue(response.birthDay);
        this.profileCustomerUpdateForm.controls.age.setValue(response.age);
        this.profileCustomerUpdateForm.controls.gender.setValue(response.gender);
      },
      error => {
        console.log(error);
      }
    )

  }
}
