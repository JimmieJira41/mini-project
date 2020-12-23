import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  newCustomerForm = new FormGroup({});
  addressList = new  FormArray([]);
  profileCustomer = {}

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

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.newCustomerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      weight: [''],
      height: [''],
      birthDay: ['', Validators.required],
      age: [''],
      gender: ['', Validators.required],
      addresses: this.fb.array([
        this.fb.group({
          id: [''],
          address: ['', Validators.required],
          line1: [''],
          line2: [''],
          postalCode: ['', Validators.required],
        }),
      ]),
    });
    this.addressList = this.newCustomerForm.get('addresses') as FormArray;
  }

  onSubmitNewCustomer() {
    this.profileCustomer = this.newCustomerForm.getRawValue();
    console.log(this.profileCustomer);
    this.userService.createCustomer(this.profileCustomer).subscribe(
      response => {
        Swal.fire({
          title: "Success!",
          text: "Creating customer successful!",
          icon: "success"
        })
      },
      error => {
        Swal.fire({
          title: "Fail!",
          text: "Creating customer fail!",
          icon: "error"
        })
      }
    )
  }
}
