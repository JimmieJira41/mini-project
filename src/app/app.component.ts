import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-build';
  constructor(private router:Router){
  }
 
  onLogout():void{
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
