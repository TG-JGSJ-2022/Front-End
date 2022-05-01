import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector-grahp1',
  templateUrl: './selector-grahp1.component.html',
  styleUrls: ['./selector-grahp1.component.css']
})
export class SelectorGrahp1Component implements OnInit {
  public stiles:string = "bar";
  public typesStiles:any = {
    "Barra":"bar",
    "Lista":"list"
  }
  public listaTipos:any = ["Barra","Lista"]
  constructor() { }

  ngOnInit(): void {
  }
  change(){}

}
