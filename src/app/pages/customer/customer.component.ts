import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { IEventEmitter } from '../interfaces/i-EventEmitter';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private userService: UserService, private route: Router) { }

  customerList = {
    id: "",
    firstname: "",
    lastname: "",
    weight: "",
    height: "",
    birthday: "",
    age: "",
    gender: ""
  }
  lists: any;
  ngOnInit(): void {
    this.getCustomer();
  }
   onCustomerListEvnet(event: IEventEmitter) {
    switch (event.action) {
      case "EDIT": {
        this.route.navigate(['/update-customer', event.customerId]);
        break;
      }
      case "REFRESH": {
        Swal.fire({
          title: "Successful!",
          text: "Deleting successful",
          icon: "success"
        }).then((confirm) => {
          this.getCustomer();
        })
        break;
      }
      case "VIEW":{
        this.route.navigate(['/view-customer', event.customerId]);
        break;
      }
    }
  }

  getCustomer() {
    this.userService.getListCustomer().subscribe(
      response => {
        this.lists = response.map((customer: any) => {
          return customer;
        })
        console.log(this.lists);
        // console.log(typeof(response));
        // console.log(response);
        // console.log(response.lastname);
        // console.log(response.weight);
        // console.log(response.height);
        // console.log(response.birthday);
        // console.log(response.age);
        // console.log(response.gender);
      },
      error => {
        console.log(error);
      }
    );
  }
  onSubmitDeleteCustomer(idCustomer: string) {
    //  this.customerList.id = idCustomer;
    Swal.fire({
      title: "Are you sure!",
      text: "Would you like to delete detail customer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I'm sure!"
    }).then((confirm) => {
      if (confirm) {
        this.userService.deleteCustomer(idCustomer).subscribe(
          response => {
            Swal.fire({
              title: "Success!",
              text: "Deleting successful!",
              icon: "success",
            }).then((confirm) => {
              if (confirm) {
                location.reload();
              }
            })
          },
          error => {
            console.log(error);
            Swal.fire({
              title: "Fail!",
              text: "Deleting fail!",
              icon: "error",
              timer: 2000
            })
          }
        )
      }
    })
  }
}
