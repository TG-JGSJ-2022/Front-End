import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics-page',
  templateUrl: './graphics-page.component.html',
  styleUrls: ['./graphics-page.component.css']
})
export class GraphicsPageComponent implements OnInit {
  public const: any = {
    "feliz": "positivo",
    "triste": "negativo",
    "confundido": "negativo",
    "aburrido": "negativo",
    "frustrado": "negativo",
    "estresado": "negativo"
  }
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
