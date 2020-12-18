import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  constructor(private userService:UserService,private route:ActivatedRoute) { }
  idCustomer:string = "";
  profileCustomer:any = {
    id:"",
    firstname:"",
    lastname:"",
    weight: "",
    height: "",
    birhtday: "",
    age: "",
    gender:""
  }
  ngOnInit(): void {
   this.route.params.subscribe(params=>{
    this.idCustomer = params['id'];
   });
    this.userService.getProfileCustomer(this.idCustomer).subscribe(
      response=>{
        this.profileCustomer.firstname = (response.firstName)
        this.profileCustomer.lastname = (response.lastName)
        this.profileCustomer.weight = (response.weight)
        this.profileCustomer.height = (response.height)
        this.profileCustomer.birthday = (response.birthDay)
        this.profileCustomer.age = (response.age)
        this.profileCustomer.gender = (response.gender)

      },
      error=>{
        console.log(error)
      }
    )
  }
}
