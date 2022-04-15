import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ''; 
  password: string = '';

  universityLogo: string = '/assets/images/PujLogo.svg';
  userLogo: string = '/assets/images/userLogo.svg'; 
  passwordLogo: string = '/assets/images/passwordLogo.svg';

  constructor(private router: Router, 
              private userService: UserServiceService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      console.log("User already sign in");
    }
  }

  submitForm(event: any) {
    this.userService.login(this.username, this.password)
      .subscribe( (data) => {
        sessionStorage.setItem('user', this.username);
        this.router.navigate(["/courses"]);
        console.log(data);
      }, (error) => {
        this.router.navigate(["/login"]);
      });
  }

}
