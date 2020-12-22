import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent implements OnInit {
  newAddress = new FormGroup({})
  constructor(private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder) { }
  customerId: any;

  buildForm() {
    this.newAddress = this.fb.group({
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

  onSubmitNewAddres(){
    
  }
}
