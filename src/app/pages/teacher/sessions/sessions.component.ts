import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  public sessions: any = [];

  constructor() { }

  ngOnInit(): void {
    // Active session doesn't show into the table
    this.sessions = [
      {
        "clase": 123, 
        "fecha": "dd / mm / yyyy",
        "estado": "Activa"
      }, 
      {
        "clase": 456, 
        "fecha": "dd / mm / yyyy",
        "estado": "Finalizada"
      }
    ];
  }

}
