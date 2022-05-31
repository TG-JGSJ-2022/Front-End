import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';


interface resopnseUser {
  id: string,
  username: string,
  rol: string
}

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

  constructor(
    private router: Router,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['/courses']);
    }
  }

  submitForm(event: any) {
    this.userService.login(this.username, this.password)
      .subscribe((data: resopnseUser) => {
        console.log(Response)
        sessionStorage.setItem('user', data.username);
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem('rol', data.rol);
        if (data.rol == "estudiante") {
          this.router.navigate(["/capture"]);
        }
        else {
          this.router.navigate(["/agreement"]);
        }
      }, () => {
        this.router.navigate(["/login"]);
      });
  }

}
