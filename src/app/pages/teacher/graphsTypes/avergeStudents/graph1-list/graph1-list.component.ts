import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-graph1-list',
  templateUrl: './graph1-list.component.html',
  styleUrls: ['./graph1-list.component.css']
})
export class Graph1ListComponent implements OnInit {
  @Input()
  public sesionId:number;
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

    this.userService.getDataSesion(this.sesionId).subscribe(response => {

      this.data = response;
      this.graph()
      // this.example()
    }, (error) => {
      this.data = {
      }
    })

  }

  graph(){

    const xAxisDataTime = this.data["dates"];
    const good_emotios = [];
    const bad_emotions = [];



    this.data["dates"].forEach(date => {
      let good = 0;
      let bad = 0;
      let students = 0;
      this.data["data"].forEach(d => {
        if (d["fecha"] == date) {
          if (this.const[d["emocion"]] == "positivo") {
            good++;
          }else{
            bad++;
          }
          students++;
        }
      })
      good_emotios.push((good/students)*100);
      bad_emotions.push((bad/students)*100);
    });

    this.options = {
      legend: {
        data: ['No Alerta', 'Alerta'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisDataTime,
        silent: false,
        splitLine: {
          show: true,
        },
      },
      yAxis: {
        splitLine: {
          show: false,
        },

      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          name: 'No Alerta',
          type: 'line',
          data: good_emotios,
          animationDelay: (idx) => idx * 10,
          itemStyle: {
            color: 'rgb(35, 176, 0)'
          }
        },
        {
          name: 'Alerta',
          type: 'line',
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
