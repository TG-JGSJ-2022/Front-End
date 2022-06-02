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
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router,
    private userServices: UserServiceService,
    private modal: ModalServiceService,
    private modalService: NgbModal,
  ) {
    this.alive = true;
    this.interval = 10000;
  }

  timer: any;
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
  class_name: string = "Análisis de Algoritmos"; //con el id de la clase en la tabla sesión
  emociones = [];
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
    'Feliz': this.em_0,
    'Triste': this.em_1,
    'Confundido': this.em_2,
    'Estresado ': this.em_3,
    'Aburrido': this.em_4,
    'Frustrado': this.em_5
  }
  public sortedData = [];
  subscription: Subscription;
  subscriptionHora: Subscription;
  ngOnInit(): void {

    this.studentsOnline = 0;
    this.positiveResult = 0;
    this.negativeResult = 0;
    this.estudiantes = [];
    if (this.getData() == 'profesor') {
      this.nextHour();
    }
  }

  logout(): void {
    this.userServices.logout().subscribe(res => {
      sessionStorage.clear();
      this.router.navigate(["/login"]);

    }, err => {
      console.log(err);
    });

  }

  timeToNextHourInMs = (currentTimestampMs) => {
    const timestampSeconds = currentTimestampMs / 1000;

    const numberOfSecondsIntoTheCurrentHour = timestampSeconds % 3600;

    const numberOfSecondsToTheNextHour = 3600 - numberOfSecondsIntoTheCurrentHour;

    return numberOfSecondsToTheNextHour * 1000;
  };

  nextHour() {
    let actualTime = new Date();
    this.timer = this.timeToNextHourInMs(actualTime);
    this.timer_b = true;
    this.subscriptionHora = TimerObservable.create(0, this.timer)
      .subscribe(() => {
        this.houreRange();
      });
  }

  houreRange() {
    if (this.timer_b == true) {
      this.timer_b = false;
      this.diasSesiones();
    } else {
      this.subscriptionHora.unsubscribe();
      this.subscriptionHora = TimerObservable.create(0, 3600000)
        .subscribe(() => {
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
      .subscribe((res) => {
        const results: Horarios[] = res;
        for (let i = 0; results.length > i; i++) {
          if (this.diaCalendario() == results[i].dia) {
            if (results[i].hora_inicio[1] == ":") {
              hora = results[i].hora_inicio[0];
            } else {
              hora = results[i].hora_inicio[0] + results[i].hora_inicio[1];
            }
            if (results[i].hora_fin[1] == ":") {
              fin = results[i].hora_fin[0];
            } else {
              fin = results[i].hora_fin[0] + results[i].hora_fin[1];
            }

            hora_inicio.setHours(Number(hora), 0, 0)
            hora_fin.setHours(Number(fin), 59, 0)
            if (hora_fin < hoy) {
              this.activeClass = false;
            } else {
              if (hora_inicio > hoy) {
                this.activeClass = false;
                this.alive = false;
              } else if (hoy < hora_fin) {
                this.activeClass = true;
                this.consultar_inicio();
                this.alive = true;
              } else {
                this.activeClass = false;
                this.alive = false;
                this.consultar_inicio();
              }
            }
          } else {
            //this.subscriptionHora.unsubscribe();
          }
        }
      });


  }

  diaCalendario() {
    let hoy = new Date();
    if (hoy.getDay() == 0) {
      return 'Domingo';
    } else if (hoy.getDay() == 1) {
      return 'Lunes'
    } else if (hoy.getDay() == 2) {
      return 'Martes'
    } else if (hoy.getDay() == 3) {
      return 'Miercoles'
    }
    else if (hoy.getDay() == 4) {
      return 'Jueves'
    }
    else if (hoy.getDay() == 5) {
      return 'Viernes'
    }
    else if (hoy.getDay() == 6) {
      return 'Sabado'
    }
  }

  consultar_inicio() {
    if (this.alive) {
      this.subscription = TimerObservable.create(0, this.interval)
        //.takeWhile(() => this.alive)
        .subscribe(() => {
          this.update_data();
        });
      //}

    } else {
      this.subscription.unsubscribe();
    }
  }

  claseActiva(content): void {
    if (this.getData() == 'profesor') {
      if (this.activeClass == true) {
        this.modalService.open(content, { centered: true, modalDialogClass: 'modal-body' });
      }
    }
  }

  private count = 0;
  public update_data() {
    this.modal.getResultsPrediction().subscribe((res) => {
      this.emociones = [];
      this.estudiantes = [];
      this.studentsOnline = 0;
      this.positiveResult = 0;
      this.negativeResult = 0;
      this.postiiveStudents = 0;
      this.negativeStudents = 0;
      const btn = document.getElementById('modalButton');
      if (res[0].status == 1) {
        btn.style.visibility = 'hidden';
        return;
      }

      btn.style.visibility = 'visible';

      let date = new Date(res[0].date);
      this.class_name = res[0].name;
      const day = date.toLocaleString('default', { day: '2-digit' });
      const month = date.toLocaleString('default', { month: 'long' });
      this.sesion_date = day + ' de ' + month;
      if (res[0].emocion_id == null) {
        console.log("No hay estudiantes activos");
        return;
      }
      for (var i = 0; i < res.length; i++){
        console.log(res[i])
        if(this.estudiantes.indexOf(res[i].estudiante_id) == -1){
          this.estudiantes.push(res[i].estudiante_id)
          console.log(this.estudiantes)
        }
      }
      let emotions = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
      console.log("prev", this.estudiantes.length)
      this.defineEmotions(res, emotions);
      this.estudiantes = [];
    });

  }
  public defineEmotions(results, emotions){
    console.log(emotions);
    results.forEach(element => {
      emotions[element.emocion_id] = emotions[element.emocion_id] + 1;
    });

    this.studentsOnline = this.estudiantes.length;
    console.log("-----------");
    console.log(this.studentsOnline);
    console.log(emotions);
    this.positiveResult = Math.round((emotions[1] / this.studentsOnline) * 100);
    this.negativeResult = Math.round(((emotions[2] + emotions[3] + emotions[4] + emotions[5] + emotions[6]) / this.studentsOnline) * 100);

    if (emotions[2] > 0)
      this.emociones.push({
        'nombre': this.emocion_1, 'porcentaje':
          ((emotions[2] / this.studentsOnline) * 100)
      });
    if (emotions[3] > 0)
      this.emociones.push({
        'nombre': this.emocion_2, 'porcentaje':
          ((emotions[3] / this.studentsOnline) * 100)
      });
    if (emotions[4] > 0)
      this.emociones.push({
        'nombre': this.emocion_3, 'porcentaje':
          ((emotions[4] / this.studentsOnline) * 100)
      });
    if (emotions[5] > 0)
      this.emociones.push({
        'nombre': this.emocion_4, 'porcentaje':
          ((emotions[5] / this.studentsOnline) * 100)
      });
    if (emotions[6] > 0)
      this.emociones.push({
        'nombre': this.emocion_5, 'porcentaje':
          ((emotions[6] / this.studentsOnline) * 100)
      });
    // this.emociones.sort((data, prev) => this.emociones_id[data.porcentaje] - this.emociones_id[prev.porcentaje])

  }

  public getData() {
    return sessionStorage.getItem('rol');
  }

  public end_sesion() {
    this.activeClass = false;
    this.subscription.unsubscribe()
    this.modal.postEndSesion()
      .subscribe((res) => {
      });

  }
}
