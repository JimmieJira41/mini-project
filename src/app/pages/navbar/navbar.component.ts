import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() message:string | undefined;
  
  constructor(private router:Router,private cookieService: CookieService){}
  isCollapsed = true;
  
  ngOnInit(): void {
  }

  onLogout():void{
    localStorage.removeItem('token');
    this.cookieService.delete('Token');
    this.router.navigate(['']);
  }

}
