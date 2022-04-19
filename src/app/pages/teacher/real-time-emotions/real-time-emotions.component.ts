import { Component, ViewEncapsulation, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { Results } from 'src/app/interfaces/results';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { TimerObservable } from 'rxjs-compat/observable/TimerObservable'

//import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-real-time-emotions',
  templateUrl: './real-time-emotions.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./real-time-emotions.component.css']
})

export class RealTimeEmotionsComponent implements OnInit {
  
  studentsOnline: number = 0;
  positiveResult: number = 0;
  negativeResult: number = 0;
  positivePorcentage: number = 0;
  negativePorcentage: number = 0;
  postiiveStudents: number = 0;
  negativeStudents: number = 0;
  sesion_date: string = "29 de Marzo";
  class_name: string =  "Estructuras de Datos"; //con el id de la clase en la tabla sesión
  emociones = [
  ];
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
  constructor(
    private modalService: NgbModal,
    private modal : ModalServiceService,
    
  ) {
    this.alive = true;
    this.interval = 1000000;
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, modalDialogClass: 'modal-body' });
  }

  ngOnInit(): void {

    this.studentsOnline = 0;
    this.positiveResult = 0;
    this.negativeResult = 0;
    TimerObservable.create(0, this.interval)
      //.takeWhile(() => this.alive)
      .subscribe(() =>{
        this.update_data();
        console.log('rest');
      });
    
  }

  public update_data(){
    this.modal.getResultsPrediction().subscribe((res) => {
      const results: Results[] = res;
      let date = new Date(results[1].fecha); //Debe ser desde la tabla sesion
      const day = date.toLocaleString('default', {day: '2-digit'});
      const month = date.toLocaleString('default', {month: 'long'});
      this.sesion_date = day + ' de ' + month ;
      this.positiveResult = 0;
      this.negativeResult = 0;
      this.postiiveStudents = 0;
      this.negativeStudents = 0;
      this.em_1 = 0;
      this.em_2 = 0;
      this.em_3 = 0;
      this.em_4 = 0;
      this.em_5 = 0;
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
      this.studentsOnline = this.postiiveStudents + this.negativeStudents;
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
      
      })

  }
  
}
