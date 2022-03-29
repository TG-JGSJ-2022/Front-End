import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'



@Component({
  selector: 'app-real-time-emotions',
  templateUrl: './real-time-emotions.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./real-time-emotions.component.css']
})

export class RealTimeEmotionsComponent implements OnInit {
  
  studentsOnline: number = 0;
  positiveResult: number = 0;
  negativeResult: number = 0;


  constructor(private modalService: NgbModal) {}


  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, modalDialogClass: 'modal-body' });
  }

  ngOnInit(): void {
    this.studentsOnline = 19;
    this.positiveResult = 60;
    this.negativeResult = 40;

  }

  
}
