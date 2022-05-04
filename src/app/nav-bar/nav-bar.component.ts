import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { Results } from 'src/app/interfaces/results';
import { TimerObservable } from 'rxjs-compat/observable/TimerObservable'


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
    private modal : ModalServiceService,
    private modalService: NgbModal,
    ) {
      this.alive = true;
      this.interval = 10000;
    }
  
  activeClass: boolean = true;
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
  ngOnInit(): void {
    //if(sessionStorage.getItem('activeclass')) {
      //console.log("Clase activa, NO puede cerrar sesión ")     
      this.studentsOnline = 0;
      this.positiveResult = 0;
      this.negativeResult = 0;
      this.estudiantes = [];
      TimerObservable.create(0, this.interval)
      //.takeWhile(() => this.alive)
      .subscribe(() =>{
        this.update_data();
        console.log('rest');
      });
    //}

  }

  logout(): void {
    sessionStorage.clear();
    this.userServices.logout().subscribe(res=>{
      console.log(res)
      sessionStorage.clear();

    });
    this.router.navigate(["/login"]);
  }

  claseActiva(content) : void {
    this.modalService.open(content, { centered: true, modalDialogClass: 'modal-body' });
  }

  public update_data(){
    this.modal.getResultsPrediction().subscribe((res) => {
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
        let date = new Date(results[0].fecha); //Debe ser desde la tabla sesion
        const day = date.toLocaleString('default', {day: '2-digit'});
        const month = date.toLocaleString('default', {month: 'long'});
        this.sesion_date = day + ' de ' + month ;

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
    })

  }
}
