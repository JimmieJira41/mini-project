import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IAddressModel } from '../interfaces/i-address-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {
  updateAddress = new FormGroup({});
  customerId?: string;
  addressId: string = "";
  detailAddress!: any;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.buildForm();
  }

  getIdUrl() {
    this.route.params.subscribe(param => {
      console.log(param);
      this.customerId = param['customerId']
      this.addressId = param['addressId']
    })
  }

  buildForm() {
    this.updateAddress = this.fb.group({
      address: ['', Validators.required],
      line1: [''],
      line2: [''],
      postalCode: ['', Validators.required]
    })
    this.getAddress();
  }
  getAddress() {
    this.userService.getAddress(this.addressId).subscribe(
      response => {
        this.updateAddress.controls.address.setValue(response.address);
        this.updateAddress.controls.line1.setValue(response.line1);
        this.updateAddress.controls.line2.setValue(response.line2);
        this.updateAddress.controls.postalCode.setValue(response.postalCode);
      },
      error => {
      }
    )

  }
  onSubmitUpdateAddress() {
    // this.detailAddress = ;
    // console.log(this.detailAddress);
    this.detailAddress = this.updateAddress.getRawValue();
    this.detailAddress.id = this.addressId; 
    this.detailAddress.m_customer_id = this.customerId;
    // console.log(this.detailAddress);
    this.userService.updateAddress(this.detailAddress).subscribe(
      response=>{
        Swal.fire({
          title: "Successful!",
          text: "Updating address successful!",
          icon: "success"
        }).then(()=>{
          this.router.navigate(['/view-customer',this.customerId]);
        })
      },
      error=>{

      }
    )
  }
}
