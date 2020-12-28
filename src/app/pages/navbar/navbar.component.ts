import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() message: string | undefined;

  constructor(private router: Router, private cookieService: CookieService, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
  }

  changeLanguage(lang: string) {
    console.log(lang)
    this.translate.use(lang)
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this.cookieService.delete('Token');
    this.router.navigate(['']);
  }

}
