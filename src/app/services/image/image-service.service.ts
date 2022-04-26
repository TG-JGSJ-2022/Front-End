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
    console.log(date)
    console.log(date.toLocaleString())
    return this.http.post<ResponseInterface>(environment.model_endpoint, {"image" :base64Image,"fecha":date.toLocaleString()}, {
      responseType: 'json',
      withCredentials: true
    });
  }

}
