import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-graph1-list',
  templateUrl: './graph1-list.component.html',
  styleUrls: ['./graph1-list.component.css']
})
export class Graph1ListComponent implements OnInit {
  @Input()
  public sesionId: number;
  public options: any;

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

  graph() {
    var colors = {
      "feliz": "rgba(221, 121, 255 ,1)",
      "triste": 'rgba(255, 110, 118,1)',
      "confundido": 'rgba(81, 2, 218 ,1)',
      "aburrido": 'rgba(2, 146, 218,1)',
      "frustrado": "#CDDA02",
      "estresado": "#4D4D4D"
    }
    var colors2 ={
      "positivas":"rgba(35, 176, 0 ,1)",
      "alertas":"rgba(255, 0, 0,1)"
    }
    var pie = {
      "feliz": 0,
      "triste": 0,
      "confundido": 0,
      "aburrido": 0,
      "frustrado": 0,
      "estresado": 0
    };
    var pie2 = {
      "positivas": 0,
      "alertas": 0,
    };
    console.log(this.data)
    this.data["data"].forEach(data => {

      pie[data["emocion"]] =  pie[data["emocion"]] +1;
      if (data["emocion"] == "feliz"){
        pie2["positivas"] = pie2["positivas"] +1
      }else{
        pie2["alertas"] = pie2["alertas"] +1
      }
    });

    this.options = {
      title: {
        show: true,
        text: "Porcentaje de emociones en la sesión",
        left: "left",
        top: 0,
        subtext: "Informacion del procentaje\nen todo el tiempo de la clase",
        subtextStyle: {
          fontSize: 15
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        data: [
          "feliz",
          "triste",
          "confundido",
          "aburrido",
          "frustrado",
          "estresado",
          "positivas",
          "alertas"
        ],
        right: '0%',
        bottom: "0%",
        orient:"vertical"
      },
      series: [
        {
          name: 'Emociones',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            position: 'inner',
            fontSize: 14
          },
          labelLine: {
            show: false
          },
          data: [
            { value:pie2['positivas'], name: 'positivas' },
            { value: pie2['alertas'], name: 'alertas' },
          ],
          itemStyle: {
            color: function (param) {
              console.log(param["name"])
              return colors2[param["name"]]
            },
          }
        },
        {
          name: 'Emociones específicas',
          type: 'pie',
          radius: ['45%', '60%'],
          labelLine: {
            length: 30
          },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#F6F8FC',
            borderColor: '#8C8D8E',
            borderWidth: 1,
            borderRadius: 4,

            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#8C8D8E',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#4C5058',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 33
              },
              per: {
                color: '#fff',
                backgroundColor: '#4C5058',
                padding: [3, 4],
                borderRadius: 4
              }
            }
          },
          data: [
            { value: pie["feliz"], name:"feliz"},
            { value: pie["aburrido"], name: "aburrido"},
            { value: pie["triste"], name: "triste"},
            { value: pie["confundido"], name: "confundido"},
            { value: pie["estresado"], name:"estresado"},
            { value: pie["frustrado"], name:"frustrado"}
          ],
          itemStyle: {
            color: function (param) {
              console.log(param["name"])
              return colors[param["name"]]
            },
          }
        }
      ]

    }

  };

}
