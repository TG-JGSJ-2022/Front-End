import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graphics-page',
  templateUrl: './graphics-page.component.html',
  styleUrls: ['./graphics-page.component.css']
})
export class GraphicsPageComponent implements OnInit {
  public sesionId:number = 7;
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem("id"))
    if (!sessionStorage.getItem("id")) {
      console.log("entra anull")
      this.router.navigate(["/login"]);
    } else {
      if (sessionStorage.getItem("rol") == "estudiante") {
        this.router.navigate(["/capture"]);
      }
    }
  }
  change(){}

}
