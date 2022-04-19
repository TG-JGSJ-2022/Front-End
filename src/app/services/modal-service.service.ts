import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Results } from '../interfaces/results';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor(private http: HttpClient) {
    
   }
   getResultsPrediction(): Observable<Results[]>{
    return this.http.get<Results[]>(environment.result_endpoint, {});
  }
}
