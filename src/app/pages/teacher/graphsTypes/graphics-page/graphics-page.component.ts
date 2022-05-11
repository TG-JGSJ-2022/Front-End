import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent } from 'src/app/pages/shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-graphics-page',
  templateUrl: './graphics-page.component.html',
  styleUrls: ['./graphics-page.component.css']
})
export class GraphicsPageComponent implements OnInit {

  public sesionId: string;

  constructor(
    private readonly route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sesionId = this.route.snapshot.paramMap.get('id');

    if (!sessionStorage.getItem("id")) {
      this.router.navigate(["/login"]);
    } else if (sessionStorage.getItem("rol") == "estudiante") {
      this.router.navigate(["/capture"]);
    }
  }

  change(){}

}
