import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponseInterface} from '../../interfaces/response-interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }

  postImagePrediction(base64Image: string): Observable<ResponseInterface> {
    let date:Date =  new Date(Date.now());
    console.log(date);
    console.log(date.toUTCString());
    console.log(date.toLocaleDateString());
    console.log(date.toJSON());
    console.log(date.toLocaleString());
    let fecha:String = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() 
      + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    console.log("DATE: ", fecha); 
    return this.http.post<ResponseInterface>(environment.model_endpoint, {"image" :base64Image,"fecha":fecha}, {
      responseType: 'json',
      withCredentials: true
    });
  }

}
