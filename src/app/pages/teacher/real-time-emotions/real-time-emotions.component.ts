import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-real-time-emotions',
  templateUrl: './real-time-emotions.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./real-time-emotions.component.css']
})

export class RealTimeEmotionsComponent implements OnInit {
  
  closeResult: string;

  constructor(private modalService: NgbModal) {}


  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, modalDialogClass: 'modal-body' });
  }

  ngOnInit(): void {

  }

  
}
