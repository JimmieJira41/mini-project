import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  // newCustomerForm: FormGroup;
  newCustomerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    weight: [''],
    height: [''],
    birthDay: ['', Validators.required],
    age: [''],
    gender: ['', Validators.required],
    address: this.fb.group([{
        id: [''],
        address: ['', Validators.required],
        line1: [''],
        line2: [''],
        postalCode: ['', Validators.required]
      }])
  })
  // profileCustomer = { }
  // newCustomerForm = this.fb.group({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   weight: new FormControl(''),
  //   height: new FormControl(''),
  //   birthDay: new FormControl(''),
  //   age: new FormControl(''),
  //   gender:new FormControl(''),
  //   address: this.fb.group({
  //     id: new FormControl(''),
  //     address: new FormControl(''),
  //     line1: new FormControl(''),
  //     line2: new FormControl(''),
  //     postalcode: new FormControl('')
  //   })
  // })
  constructor(private fb: FormBuilder, private userService: UserService) { }

  profileCustomer = {}
  ngOnInit(): void {
  }
  onSubmitNewCustomer() {
    console.log(this.profileCustomer);
    this.profileCustomer = this.newCustomerForm.getRawValue();
    this.userService.createCustomer(this.profileCustomer).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }
}
