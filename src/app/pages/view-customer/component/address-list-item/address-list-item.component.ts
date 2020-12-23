import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IAddressModel } from 'src/app/pages/interfaces/i-address-model';
import { IEventEmitter } from 'src/app/pages/interfaces/i-EventEmitter';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-address-list-item',
  templateUrl: './address-list-item.component.html',
  styleUrls: ['./address-list-item.component.css']
})
export class AddressListItemComponent implements OnInit {

  @Input() model!: IAddressModel;
  @Input() customerId!: string; 
  @Output() eventEmitter = new EventEmitter<IEventEmitter>();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  updateAddress(){
    let event: IEventEmitter = {
      addressId: this.model.id,
      customerId: this.customerId,
      action: "EDIT"
    }
    this.eventEmitter.emit(event);
  }

  deleteAddress() {
    Swal.fire({
      title: "Are you sure!",
      text: "Data can't recovered after deleting finish!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "d33",
      confirmButtonText: "I'm sure!"
    }).then((confirm) => {
      if (confirm.isConfirmed) {
        this.userService.deleteAddress(this.model.id).subscribe(
          response => {
            let event: IEventEmitter = {
              action: "REFRESH"
            }
            this.eventEmitter.emit(event);
          },
          error => {
            let event: IEventEmitter = {
              action: "ERROR"
            }
            this.eventEmitter.emit(event);
          }
        )
      }
    })
  }
}
