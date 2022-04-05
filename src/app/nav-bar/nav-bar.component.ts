import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../pages/shared/login/login.component';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authServiceService:AuthServiceService) { }
  activeClass:boolean = true;
  ngOnInit(): void {
  }
  onLogOut():void{
   this.authServiceService.logoutUser();
  }
  onClassActive():void{
  }

}
