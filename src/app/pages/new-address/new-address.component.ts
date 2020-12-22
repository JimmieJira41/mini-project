import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent implements OnInit {
  newAddress = new FormGroup({})
  constructor(private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder) { }
  customerId: any;
  detailAddress = {
    m_customer_id: "",
    address: {
    }
  };
  buildForm() {
    this.newAddress = this.fb.group({
      id:[''],
      address: ['',Validators.required],
      line1: [''],
      line2: [''],
      postalCode:['',Validators.required],
    })
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = params['id'];
    })
    this.buildForm();
  }

  onSubmitNewAddress(){
    this.detailAddress.m_customer_id = this.customerId;
    this.detailAddress.address = this.newAddress.getRawValue();
    console.log(this.detailAddress);
    this.userService.createAddress(this.detailAddress).subscribe(
      response=>{
        Swal.fire({
          title: "Successful!",
          text: "Create your new address successful!",
          icon: "success"
        }).then((confirm)=>{
          if(confirm){
            location.replace('/view-customer/'+this.customerId);
          }
        })
      },
      error=>{
        Swal.fire({
          title: "Fail!",
          text: "Create your new address fail!",
          icon: "error"
        })
      }
    )
  }
}
