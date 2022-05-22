import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-studens-conected',
  templateUrl: './studens-conected.component.html',
  styleUrls: ['./studens-conected.component.css']
})
export class StudensConectedComponent implements OnInit {

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
    console.log(this.sesionId)
    this.userService.getDataSesion(this.sesionId).subscribe(response => {
      this.data = response;
      console.log(this.data)
      this.graph()
      // this.example()
    }, (error) => {
      this.data = {
      }
    })

  }

  graph(){

    const xAxisDataTime = this.data["dates"];
    const num_students = [];

    this.data["dates"].forEach(date => {

      let students = 0;
      this.data["data"].forEach(d => {
        if (d["fecha"] == date) {
          students++;
        }
      })
      num_students.push(students);
    });

    this.options = {
      legend: {
        data: ['Estudiantes'],
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
          name: 'Estudiantes',
          type: 'bar',
          data: num_students,
          animationDelay: (idx) => idx * 10,
          itemStyle: {
            color: 'rgb(35, 50, 91)'
          }
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };

  }
}
