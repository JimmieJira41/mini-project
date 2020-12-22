import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ICustomerModel } from 'src/app/pages/interfaces/i-customer-model';
import { IEventEmitter } from 'src/app/pages/interfaces/i-EventEmitter';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list-item',
  templateUrl: './customer-list-item.component.html',
  styleUrls: ['./customer-list-item.component.css']
})
export class CustomerListItemComponent implements OnInit {

  @Input() model!: ICustomerModel;
  @Output() eventEmitter = new EventEmitter<IEventEmitter>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  updateCustomer(): void {
    let event: IEventEmitter = {
      customerId: this.model.id,
      action: "EDIT"
    }
    this.eventEmitter.emit(event);
  }
  deleteCustomer(): void {
    Swal.fire({
      title: "Are you sure!",
      text: "detail address can't recover after deleting finish!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I'm sure!"
    }).then((confirm) => {
      console.log(confirm)
      if (confirm.isConfirmed) {
        this.userService.deleteCustomer(this.model.id).subscribe(
          response => {
            let event: IEventEmitter = {
              action: "REFRESH"
            }
            this.eventEmitter.emit(event);
          },
          error => {
            console.log(error);
          }
        )
      }
    })
  }
  viewCustomer():void{
    let event: IEventEmitter = {
      customerId: this.model.id,
      action: "VIEW"
    }
    this.eventEmitter.emit(event);
  }
}
