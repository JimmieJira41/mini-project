import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { IAddressModel } from '../interfaces/i-address-model';
import { IEventEmitter } from '../interfaces/i-EventEmitter';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }
  showProcessSpin: boolean = false;
  // color:ThemePlalette = "accent;
  customerId: string = "";
  addressId: string = "";
  profileCustomer: any = {
    id: "",
    firstname: "",
    lastname: "",
    weight: "",
    height: "",
    birhtday: "",
    age: "",
    gender: ""
  }

  // addressList: any = [{
  //   id: "",
  //   address: "",
  //   line1: "",
  //   line2: "",
  //   postalCode: ""
  // }]

  addressList: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = params['id'];
    });
    this.userService.getProfileCustomer(this.customerId).subscribe(
      response => {
        this.profileCustomer.firstname = (response.firstName)
        this.profileCustomer.lastname = (response.lastName)
        this.profileCustomer.weight = (response.weight)
        this.profileCustomer.height = (response.height)
        this.profileCustomer.birthday = (response.birthDay)
        this.profileCustomer.age = (response.age)
        this.profileCustomer.gender = (response.gender)
      },
      error => {
        console.log(error)
      }
    )
    this.fetchAddress();
    this.processSpin();
  }

  fetchAddress() {
    this.userService.fetchAddress(this.customerId).subscribe(
      response => {
        if (response != null) {
          this.addressList = response.map((address: any) => {
            return address;
          });
        }

      },
      error => {
        console.log(error);
      }
    )
  }

  onAddressListEvent(event: IEventEmitter) {
    switch (event.action) {
      case "EDIT": {
        this.router.navigate(['/update-address', event.customerId, event.addressId]);
        break;
      }
      case "REFRESH": {
        Swal.fire({
          title: "Successful!",
          text: "Deleting successful",
          icon: "success"
        }).then((confirm) => {
          this.fetchAddress();
        })
        break;
      }
      case "ERROR": {
        Swal.fire({
          title: "Fail!",
          text: "Deleting successful",
          icon: "warning"
        }).then((confirm) => {
          this.fetchAddress();
          this.processSpin();
        })
        break;
      }
    }
  }

  processSpin() {
    this.showProcessSpin = true;
    setTimeout(() => {
      this.showProcessSpin = false;
    }, 2000)
  }

  onSubmitDeleteAddress(customerId: string) {
    console.log(customerId);
    Swal.fire({
      title: "Are you sure!",
      text: "Your detail can't recover after deleting finish!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "I'm sure!"
    }).then((confirm) => {
      if (confirm) {
        this.userService.deleteAddress(customerId).subscribe(
          response => {
            Swal.fire({
              title: "Successful!",
              text: "Detail deleted!",
              icon: "success"
            })
          },
          error => {
            console.log(error);
          }
        )
      }
    })
  }
}
