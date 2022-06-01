import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { Results } from 'src/app/interfaces/results';
import { TimerObservable } from 'rxjs-compat/observable/TimerObservable'
import { Observable, Subscription } from 'rxjs';
import { Horarios } from 'src/app/interfaces/horarios';
import { Time } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private userServices: UserServiceService,
    private modal : ModalServiceService,
    private modalService: NgbModal,
    ) {
      this.alive = true;
      this.interval = 10000;
    }
  timer : any;
  username: string = '';
  userId: string = '';
  horarios: Horarios[];
  hoy_dia: string;
  activeClass: boolean = false;
  studentsOnline: number = 0;
  positiveResult: number = 0;
  negativeResult: number = 0;
  positivePorcentage: number = 0;
  negativePorcentage: number = 0;
  postiiveStudents: number = 0;
  negativeStudents: number = 0;
  sesion_date: string = "29 de Marzo";
  class_name: string =  "Análisis de Algoritmos"; //con el id de la clase en la tabla sesión
  emociones = [
  ];
  estudiantes = [];
  private timer_b: boolean = false;
  private alive: boolean;
  private interval: number;
  emocion_1 = 'Triste';
  emocion_2 = 'Confundido';
  emocion_3 = 'Estresado';
  emocion_4 = 'Aburrido';
  emocion_5 = 'Frustrado';
  em_0 = 0;
  em_1 = 0;
  em_2 = 0;
  em_3 = 0;
  em_4 = 0;
  em_5 = 0
  emociones_id = {
    'Feliz' : this.em_0,
    'Triste' : this.em_1,
    'Confundido' : this.em_2,
    'Estresado ' : this.em_3,
    'Aburrido' : this.em_4,
    'Frustrado' : this.em_5
  }
  public sortedData = [];
  subscription: Subscription;
  subscriptionHora: Subscription;
  ngOnInit(): void {

    this.studentsOnline = 0;
    this.positiveResult = 0;
    this.negativeResult = 0;
    this.estudiantes = [];
    if(this.getData() == 'profesor'){
      this.nextHour();
    }
  }
  ngOnDestroy(){
    //this.subscription.unsubscribe();
    //this.subscriptionHora.unsubscribe();
  }

  logout(): void {
    this.userServices.logout().subscribe(res=>{
      console.log("respuesta "+res)
      sessionStorage.clear();
      this.router.navigate(["/login"]);

    }, err =>{
      console.log(err);
    });

  }

  timeToNextHourInMs = (currentTimestampMs) => {
    const timestampSeconds = currentTimestampMs / 1000;

    const numberOfSecondsIntoTheCurrentHour = timestampSeconds % 3600;

    const numberOfSecondsToTheNextHour = 3600 - numberOfSecondsIntoTheCurrentHour;

    return numberOfSecondsToTheNextHour * 1000;
  };

  nextHour(){
    let actualTime = new Date();
    this.timer = this.timeToNextHourInMs(actualTime);
    console.log("NextHour: "+this.timer);
    this.timer_b = true;
    this.subscriptionHora = TimerObservable.create(0, this.timer)
    .subscribe(()=>{
      console.log("NextHour suscribe: "+this.timer);
      this.houreRange();
    });
  }

  houreRange(){
    if (this.timer_b == true){
      console.log("Hour range")
      this.timer_b = false;
      this.diasSesiones();
    }else{
      this.subscriptionHora.unsubscribe();
      console.log("Else hour range")
      this.subscriptionHora = TimerObservable.create(0, 3600000)
    .subscribe(()=>{
      console.log("NextHour suscribe: "+3600000);
      this.diasSesiones();
    });
    }
  }
  diasSesiones() {
    let hoy = new Date();
    let hora: string;
    let hora_inicio = new Date();
    let fin: string;
    let hora_fin = new (Date);
    this.modal.getProfesorSesion()
        .subscribe( (res) => {
          const results: Horarios[] = res;
          for(let i = 0; results.length > i; i++){
            if(this.diaCalendario() == results[i].dia){

              if(results[i].hora_inicio[1] == ":"){
                hora = results[i].hora_inicio[0];
                console.log("AM: "+hora);
              }else{
                hora = results[i].hora_inicio[0] + results[i].hora_inicio[1];
                console.log("PM: "+hora);
              }
              if(results[i].hora_fin[1] == ":"){
                fin = results[i].hora_fin[0];
                console.log("AM: "+fin);
              }else{
                fin = results[i].hora_fin[0] + results[i].hora_fin[1];
                console.log("PM: "+fin);
              }

              hora_inicio.setHours(Number(hora), 0, 0)
              hora_fin.setHours(Number(fin),0,0)
              if(hora_fin < hoy){
                this.activeClass = false;
                console.log(hora_fin, hoy)
                console.log("Clase " + results[i].clase_id+ " finalizada. Siguente clase")
              }else{
                console.log("Hora actual: " +hoy.getHours())
                console.log(hora_inicio, hoy)
                if(hora_inicio > hoy){
                  this.activeClass = false;
                  this.alive = false;
                  console.log("Hora inicia: "+hora_inicio);
                }else if(hoy < hora_fin){
                  this.activeClass = true;
                  this.consultar_inicio();
                  this.alive = true;
                }else{
                  this.activeClass = false;
                  console.log("Finaliza la clase")
                  this.alive = false;
                  this.consultar_inicio();
                }
              }
            }else{
              //this.subscriptionHora.unsubscribe();
            }
          }
        });


    }

  diaCalendario(){
    let hoy = new Date();
    if (hoy.getDay() == 0){
      return 'Domingo';
    }else if(hoy.getDay() == 1){
        return 'Lunes'
    }else if(hoy.getDay() == 2){
        return 'Martes'
    }else if(hoy.getDay() == 3){
      return 'Miercoles'
    }
    else if(hoy.getDay() == 4){
      return 'Jueves'
    }
    else if(hoy.getDay() == 5){
      return 'Viernes'
    }
    else if(hoy.getDay() == 6){
      return 'Sabado'
    }
  }

  consultar_inicio(){
    if(this.alive ){
      console.log("Clase iniciada"+this.alive)
      this.subscription = TimerObservable.create(0, this.interval)
    //.takeWhile(() => this.alive)
    .subscribe(() =>{
      this.update_data();
    });
    //}

    }else{
      this.subscription.unsubscribe();
    }
  }

  claseActiva(content) : void {
    if(this.getData() == 'profesor'){
      if(this.activeClass == true){
        console.log(this.activeClass)
        this.modalService.open(content, { centered: true, modalDialogClass: 'modal-body' });
      }
    }
  }

  public update_data(){
    this.modal.getResultsPrediction().subscribe((res) => {
      console.log(res);
      this.estudiantes = []
      this.studentsOnline = 0;
      this.positiveResult = 0;
      this.negativeResult = 0;
      this.postiiveStudents = 0;
      this.negativeStudents = 0;
      this.em_1 = 0;
      this.em_2 = 0;
      this.em_3 = 0;
      this.em_4 = 0;
      this.em_5 = 0;
      const results: Results[] = res;
      const btn = document.getElementById('modalButton');
      if(results[0].status == 1)
      {
        console.log("if");
        btn.style.visibility ='hidden';
      }else{
        btn.style.visibility = 'visible';
        console.log("else");

        //Debe ser desde la tabla sesion
        let date = new Date(results[0].date);
        this.class_name = results[0].name;
        console.log(date, this.class_name);
        const day = date.toLocaleString('default', {day: '2-digit'});
        const month = date.toLocaleString('default', {month: 'long'});
        this.sesion_date = day + ' de ' + month ;
        if(results[0].emocion_id == null){
          console.log("No hay estudiantes activos")
        }else{
          for (var i = 0; i < results.length; i++){
            console.log(results[i])
            if(this.estudiantes.indexOf(results[i].estudiante_id) == -1){
              this.estudiantes.push(results[i].estudiante_id)
              console.log(this.estudiantes)
            }
          }

          if(this.emociones.length > 0){
            for(let i = this.emociones.length -1; i >= 0  ; i--){
              this.emociones.pop()
            }
          }
          for(let i = 0; i < results.length  ; i++){
            if(results[i].emocion_id == 1 ){
              this.postiiveStudents++;
              this.positivePorcentage = results[i].porcentaje + this.positivePorcentage;
            }
            else{
              this.negativeStudents++;
              this.negativePorcentage = results[i].porcentaje + this.negativePorcentage;
              if(results[i].emocion_id == 2){
                this.em_1++;
              }
              if(results[i].emocion_id == 3){
                this.em_2++;
              }
              if(results[i].emocion_id == 4){
                this.em_3++;
              }
              if(results[i].emocion_id == 5){
                this.em_4++;
              }
              if(results[i].emocion_id == 6){
                this.em_5++;
              }
            }
          }
          this.studentsOnline = this.estudiantes.length;
          console.log(this.studentsOnline);
          this.positiveResult = Math.round((this.postiiveStudents / this.studentsOnline) * 100);
          this.negativeResult = Math.round((this.negativeStudents / this.studentsOnline) * 100);
          this.em_0 = this.postiiveStudents;


          if(this.em_1>0)
            this.emociones.push({'nombre': this.emocion_1, 'porcentaje':
            Math.round((this.em_1 / this.studentsOnline) * 100)});
          if(this.em_2>0)
            this.emociones.push({'nombre': this.emocion_2, 'porcentaje':
            Math.round((this.em_2 / this.studentsOnline) * 100)});
          if(this.em_3>0)
            this.emociones.push({'nombre': this.emocion_3, 'porcentaje':
            Math.round((this.em_3 / this.studentsOnline) * 100)});
          if(this.em_4>0)
            this.emociones.push({'nombre': this.emocion_4, 'porcentaje':
            Math.round((this.em_4 / this.studentsOnline) * 100)});
          if(this.em_5>0)
            this.emociones.push({'nombre': this.emocion_5, 'porcentaje':
            Math.round((this.em_5 / this.studentsOnline) * 100)});
          this.emociones.sort((data, prev) => this.emociones_id[data.porcentaje] -  this.emociones_id[prev.porcentaje])
        }
      }
    })

  }

  public getData(){
    return sessionStorage.getItem('rol');
  }

  public end_sesion(){
    this.activeClass = false;
    this.subscription.unsubscribe()
    this.modal.postEndSesion()
      .subscribe((res) =>{
    });

  }
}
