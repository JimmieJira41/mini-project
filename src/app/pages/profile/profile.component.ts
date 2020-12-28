import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // sanitizetion: any;

  constructor(private userService: UserService, private router: Router, private sanitizetion: DomSanitizer, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  profile = {
    id: "",
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    image: ""
  }
  script_image: string = "data:image;base64,";
  profileDetail: any;
  flag_image: boolean = false;


  transform() {
    return this.sanitizetion.bypassSecurityTrustResourceUrl(this.script_image);
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(
      reponse => {
        Object.assign(this.profile, reponse)
        this.profile.id = reponse.id;
        this.profile.username = reponse.username;
        this.profile.password = reponse.password;
        this.profile.email = reponse.email;
        this.profile.firstname = reponse.firstname;
        this.profile.lastname = reponse.lastname;
        this.profile.image = reponse.image;
        this.script_image += this.profile.image;
        console.log("check");
        console.log(this.script_image);
        console.log(reponse.image);
        // this.script_image = this.sanitizetion.bypassSecurityTrustStyle();
        //  console.log(this.profile);
        //  this.profileDetail = Object.values(reponse);
      },
      error => {
        console.log(error);
      }
    )
  }

  changeLanguage(lang: string) {
    console.log(lang)
    this.translate.use(lang);
  }

  onCheckImage() {
    if (this.profile.image != null) {
      this.flag_image = true;
    } else {
      this.flag_image = false;
    }
  }

  profileForm = new FormGroup({
    // id: new FormControl(''),
    // username: new FormControl(''),
    // password: new FormControl(''),
    // email: new FormControl(''),
    // firstname: new FormControl(''),
    // lastname: new FormControl('')
  })



}
