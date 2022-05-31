import { Component, Input, OnInit } from '@angular/core';
import { color } from 'echarts';
import { UserServiceService } from '../../../../../services/user/user-service.service';



@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.css']
})
export class Graph1Component implements OnInit {
  @Input()
  public sesionId: number;
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
      console.log(response)
      this.graph()
    }, (error) => {
      this.data = {
      }
    })

  }

  graph() {

    var xAxisDataTime = this.data["dates"];
    var line = {
      "feliz": [],
      "triste": [],
      "confundido": [],
      "aburrido": [],
      "frustrado": [],
      "estresado": []
    };
    xAxisDataTime.forEach(date => {
      var emociones = {
        "feliz": 0,
        "triste": 0,
        "confundido": 0,
        "aburrido": 0,
        "frustrado": 0,
        "estresado": 0
      };
      var x = [];
      this.data["data"].forEach(d => {

        if (d["fecha"] == date) {
          emociones[d["emocion"]] = emociones[d["emocion"]] + 1
          x.push(d)
        }
      })
      console.log(x)
      line["feliz"].push(emociones["feliz"]);
      line["triste"].push(emociones["triste"]);
      line["confundido"].push(emociones["confundido"]);
      line["aburrido"].push(emociones["aburrido"]);
      line["frustrado"].push(emociones["frustrado"]);
      line["estresado"].push(emociones["estresado"]);


    });

    this.options = {
      title: {
        show: true,
        text: "Numero de estudiantes por emociones",
        left: "left",
        top: 0,
        subtext: "Información de la cantidad de\nestudiantes por emoción\ndurante la sesión",
        subtextStyle: {
          fontSize: 12
        }

      },
      legend: {
        data: [
          "feliz",
          "triste",
          "confundido",
          "aburrido",
          "frustrado",
          "estresado",
        ],
        right: '0%',
        bottom: "0%",
        orient:"vertical"
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
          start: 0,
          end: 15
        },
        {
          show: true,
          type: "slider",
          moveHandleIcon: "pin"
        }
      ],
      series: [
        {
          name: "feliz",
          type: "line",
          smooth: true,
          data: line["feliz"],
          color:"rgba(221, 121, 255 ,1)"
        },
        {
          name: "triste",
          type: "line",
          smooth: true,
          data: line["triste"],
          color:'rgba(255, 110, 118,1)'
        },
        {
          name: "confundido",
          type: "line",
          smooth: true,
          data: line["confundido"],
          color:'rgba(81, 2, 218 ,1)'
        },
        {
          name: "aburrido",
          type: "line",
          smooth: true,
          data: line["aburrido"],
          color:'rgba(2, 146, 218,1)'
        },
        {
          name: "frustrado",
          type: "line",
          smooth: true,
          data: line["frustrado"],
          color: "#CDDA02"
        },
        {
          name: "estresado",
          type: "line",
          smooth: true,
          data: line["estresado"],
          color:  "#4D4D4D"
        }
      ],

      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };

  }
}
