import { Component, Input, OnInit } from '@angular/core';

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

  backgroundImage: string = "assets/loginBackground.png";

  /**
   * Methods
   */
  submitForm(event: any) {
    console.log(this.username); 
    console.log(this.password); 
  }

}
