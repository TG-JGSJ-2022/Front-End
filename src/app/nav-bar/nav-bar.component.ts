import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { LoginComponent } from '../pages/shared/login/login.component';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router,
              private userServices: UserServiceService) {}
  
  ngOnInit(): void {
    if(sessionStorage.getItem('activeclass')){
      console.log("Clase activa, NO puede cerrar sesión ")
    }
  }
  activeClass:boolean = true;

  submitForm(event: any){
    sessionStorage.clear();
    this.router.navigate(["/login"]);
    this.userServices.logout() 
  } 
  onClassActive():void{
    if(sessionStorage.getItem('activeclass')){
    this.router.navigate(["/modal"])
    }
  }

}
