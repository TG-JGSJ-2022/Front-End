import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-End';

  constructor(
    private readonly router: Router
  ) {

  }
  ngOnInit() : void | Promise<boolean> {
    if (!sessionStorage.getItem('user')) 
      return this.router.navigateByUrl('/');
  }

}
