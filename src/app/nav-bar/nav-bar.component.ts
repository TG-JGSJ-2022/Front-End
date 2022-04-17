import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../pages/shared/login/login.component';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
  }
  activeClass:boolean = true;
  logoutEndpoint: string = environment.api_logout;
  submitForm(event: any){

  }
  onClassActive():void{
  }

}
