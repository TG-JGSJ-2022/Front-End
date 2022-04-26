import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user/user-service.service';



@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.css']
})
export class Graph1Component implements OnInit {
  public options: any;
  public const: any = {
    "feliz": "positivo",
    "triste": "negativo",
    "confundido": "negativo",
    "aburrido": "negativo",
    "frustrado": "negativo",
    "estresado": "negativo"
  }
  constructor(private userService: UserServiceService) { }
  public data: any;
  ngOnInit(): void {
    this.userService.getDataSesion(7).subscribe(response => {
      console.log(response)
      this.data = response;
      this.graph()
    }, (error) => {
      this.data = {
      }
    })

  }

  graph(){
    console.log(this.data)
    const xAxisDataTime = this.data["dates"];
    const good_emotios = [];
    const bad_emotions = [];
    console.log("hola");

    console.log(xAxisDataTime)
    this.data["dates"].forEach(date => {
      let good = 0;
      let bad = 0;
      this.data["data"].forEach(d => {
        if (d["fecha"] == date) {
          if (this.const[d["emocion"]] == "positivo") {
            good++;
          }else{
            bad++;
          }
        }
      })
      good_emotios.push(good);
      bad_emotions.push(bad);
    });

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisDataTime,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          name: 'positivo',
          type: 'bar',
          data: good_emotios,
          animationDelay: (idx) => idx * 10,
          itemStyle: {
            color: 'rgb(35, 176, 0)'
          }
        },
        {
          name: 'negativo',
          type: 'bar',
          data: bad_emotions,
          animationDelay: (idx) => idx * 10 + 100,
          itemStyle: {

            color: 'rgb(252, 0, 0 )'
          }
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };

  }
}