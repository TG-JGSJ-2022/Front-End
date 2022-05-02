import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector-grahp1',
  templateUrl: './selector-grahp1.component.html',
  styleUrls: ['./selector-grahp1.component.css']
})
export class SelectorGraph1Component implements OnInit {
  @Input()
  public sesionId:number;
  public stiles:string = "Barra";
  public listaTipos:any = ["Barra","Lista"]
  constructor() { }

  ngOnInit(): void {
  }
  change(){}

}
