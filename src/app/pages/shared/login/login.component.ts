import { Component, Input, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Constructor(s) 
   */
  ngOnInit(): void {
  }

  /**
   * Attributes
   */
  username: string = ""; 
  password: string = "";

  loginEndpoint: string = environment.api_login;

  /**
   * Methods
   */
  submitForm(event: any) {
    console.log(event);
  }

}
