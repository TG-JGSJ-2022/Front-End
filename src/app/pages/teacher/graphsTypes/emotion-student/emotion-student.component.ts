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
  public sesionId:number;
  public student: string;
  public listStudents: any;
  public response: any;
  public options: any;
  public options2: any;
  public dataSource:any = [];


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
    this.dataSource.push(["emocion","fecha"])
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
  public setDataPie(){
    var colors ={
      "feliz": "rgba(35, 176, 0 ,1)",
      "triste": 'rgba(255, 0, 0,1)',
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
    this.dataSource.forEach(data =>{
      if (data[0] != "emocion"){
        pie[data[0]] =   pie[data[0]]  + 1;
      }

    })
    console.log(pie);
    this.options2 = {
      title: {
        text: this.student,
        subtext: 'Informacion del procentaje en todo el tiempo de la clase',
        left: 'right'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: '70%',
          data: [
            { value: (pie["feliz"]/this.dataSource.length)*100, name: 'feliz' },
            { value: (pie["triste"]/this.dataSource.length)*100, name: 'triste' },
            { value: (pie["confundido"]/this.dataSource.length)*100, name: 'confundido' },
            { value: (pie["aburrido"]/this.dataSource.length)*100, name: 'aburrido' },
            { value: (pie["frustrado"]/this.dataSource.length)*100, name: 'frustrado' },
            { value: (pie["estresado"]/this.dataSource.length*100), name: 'estresado' }
          ],
          emphasis:{
            itemStyle: {


              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          itemStyle:{
            color: function(param){
              console.log(param["name"])
                return colors[param["name"]]
              },
          }
        }
      ]
    };
  }
  public setDataTime(){
    var colors ={
      "feliz": "#CD00FF",
      "triste": "#001BFF",
      "confundido": "#5102DA",
      "aburrido": "#6D6D6D",
      "frustrado": "#CDDA02",
      "estresado": "#4D4D4D"
    }
    const xAxisDataTime = this.response["dates"];
    this.options = {
      title:{
        show:true,
        text:this.student,
        left:"right",
        top:0,
        subtext :"Emociones durante el transcurso del tiempo"
      },
      dataset: {
        source: this.dataSource
      },
      legend: {
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data:xAxisDataTime,
        name:"Hora",
        splitNumber:6
      },
      yAxis: {
        data :[
        "triste",
        "confundido",
        "aburrido",
        "frustrado",
        "estresado","feliz"],
        type:"category",
        name:"Emocion",
        splitArea: {
          // areaStyle: {
          //   color : ['rgba(255, 0, 0,0.1)','rgba(81, 2, 218 ,0.1)','rgba(2, 146, 218,0.1)',
          //   'rgba(205, 218, 2,0.1)','rgba(77, 77, 77 ,0.1)','rgba(35, 176, 0 ,0.1)'],
          //   shadowBlur: 0.5,
          //   shadowColor:"rgba(66, 214, 21, 1)"
          // },
          show: true
        },
        fontWeight : 'bold',
      },
      dataZoom: [
        {
          type: 'inside',
          start:20,
          end:70
        },
        {
          show:true,
          type:"slider",
          moveHandleIcon:"pin"
        }
      ],

      series: [
        {
          type: 'scatter',
          smooth: true,
          symbolSize:15,
          itemStyle:{

            color: function(param){

              return colors[(param.value)[0]]
            },
            symbol:"diamond"
          },
          encode:{
            x:"fecha",
            y:"emocion"
          },
          animationDelay: (idx) => idx * 10,
        }
      ],
      // animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
      darkMode:true
    };

  }

}
