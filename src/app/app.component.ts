import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-End';

  constructor(private router: Router) {

  }
  ngOnInit() {

    // console.log(sessionStorage.getItem("id"))
    // if (!sessionStorage.getItem("id")) {
    //   console.log("entra anull")
    //   this.router.navigate(["/login"]);
    // } else {
    //   if (sessionStorage.getItem("rol") == "estudiante") {
    //     this.router.navigate(["/capture"]);
    //   }
    //   else {
    //     this.router.navigate(["/courses"]);
    //   }
    // }
  }

}
