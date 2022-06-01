import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {
  public acceptPolicy = false;
  public name=this.getData();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  public validatePolicy(event): void {
    this.acceptPolicy = event.target.checked;
    if (this.acceptPolicy) {
      this.router.navigate(["/courses"]);
    }
  }
  public getData(){
    return sessionStorage.getItem('name');
  }
}
