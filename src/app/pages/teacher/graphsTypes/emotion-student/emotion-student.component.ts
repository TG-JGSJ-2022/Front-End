import { Component, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-emotion-student',
  templateUrl: './emotion-student.component.html',
  styleUrls: ['./emotion-student.component.css']
})



export class EmotionStudentComponent {
  @Input()
  public sesionId: number;
  public student: string;
  public listStudents: any;
  public response: any;
  public options: any;
  public options2: any;
  public dataSource: any = [];


  displayedColumns: string[] = ['nombre', 'fecha', 'emocion'];
  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {

    this.userService.getDataSesion(this.sesionId).subscribe(response => {

      this.listStudents = response["students"];
      this.response = response;
      // this.example()
    }, (error) => {

    })
  }
  public table(student) {
    this.student = student;
    this.dataSource = []
    this.dataSource.push(["emocion", "fecha"])
    this.response["data"].forEach(data => {
      if (data["nombre"] == this.student) {
        this.dataSource.push([
          data["emocion"],
          data["fecha"]
        ]);
      }
    })

    this.setDataTime();
    this.setDataPie();
  }
  public setDataPie() {
    var colors = {
      "feliz": "rgba(221, 121, 255 ,1)",
      "triste": 'rgba(255, 110, 118,1)',
      "confundido": 'rgba(81, 2, 218 ,1)',
      "aburrido": 'rgba(2, 146, 218,1)',
      "frustrado": "#CDDA02",
      "estresado": "#4D4D4D"
    }
    var pie = {
      "feliz": 0,
      "triste": 0,
      "confundido": 0,
      "aburrido": 0,
      "frustrado": 0,
      "estresado": 0
    };
    console.log("------")
    console.log(this.dataSource);
    this.dataSource.forEach(data => {
      if (data[0] != "emocion") {
        pie[data[0]] = pie[data[0]] + 1;
      }

    })

    console.log(pie);
    this.options2 = {
      title: {
        text: this.student[0].toUpperCase()+this.student.slice(1),
        subtext: 'Informacion del procentaje\nen todo el tiempo de la clase',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: '0%',
        bottom: "0%"
      },
      series: [
        {
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
          name:"Emoción",
          type: 'pie',
          radius: '70%',
          data: [
            { value: (pie["feliz"]), name: 'feliz' },
            { value: (pie["triste"]), name: 'triste' },
            { value: (pie["confundido"]), name: 'confundido' },
            { value: (pie["aburrido"]), name: 'aburrido' },
            { value: (pie["frustrado"]), name: 'frustrado' },
            { value: (pie["estresado"]), name: 'estresado' }
          ],
          emphasis: {
            itemStyle: {


              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          itemStyle: {
            color: function (param) {
              console.log(param["name"])
              return colors[param["name"]]
            },
          }
        }
      ]
    };
  }
  public setDataTime() {
    var colors = {
      "feliz": "rgba(221, 121, 255 ,1)",
      "triste": 'rgba(255, 110, 118,1)',
      "confundido": 'rgba(81, 2, 218 ,1)',
      "aburrido": 'rgba(2, 146, 218,1)',
      "frustrado": "#CDDA02",
      "estresado": "#4D4D4D"
    }
    const xAxisDataTime = this.response["dates"];
    this.options = {
      title: {
        show: true,
        text: this.student[0].toUpperCase()+this.student.slice(1),
        left: "center",
        top: 0,
        subtext: "Emociones durante el transcurso del tiempo"
      },
      dataset: {
        source: this.dataSource
      },
      legend: {
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisDataTime,
        name: "Hora",
        splitNumber: 6
      },
      yAxis: {
        data: [
          "triste",
          "confundido",
          "aburrido",
          "frustrado",
          "estresado", "feliz"],
        type: "category",
        name: "Emocion",
        splitArea: {
          show: true
        },
        fontWeight: 'bold',
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 50
        },
        {
          show: true,
          type: "slider",
          moveHandleIcon: "pin"
        }
      ],

      series: [
        {
          type: 'scatter',
          smooth: true,
          symbolSize: 15,
          itemStyle: {

            color: function (param) {

              return colors[(param.value)[0]]
            },
            symbol: "diamond"
          },
          encode: {
            x: "fecha",
            y: "emocion"
          },
          animationDelay: (idx) => idx * 10,
        }
      ],
      // animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
      darkMode: true
    };

  }

}
