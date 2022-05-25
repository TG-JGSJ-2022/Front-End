import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Horarios } from '../interfaces/horarios';
import { Results } from '../interfaces/results';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor(private http: HttpClient) {

   }
   getResultsPrediction(): Observable<Results[]>{
    return this.http.get<Results[]>(environment.result_endpoint, {
      withCredentials: true
    });
  }
  getProfesorSesion(): Observable<Horarios[]>{
    return this.http.get<Horarios[]>(environment.api_profesor_sesion, {
      withCredentials: true
    });
  }
}
