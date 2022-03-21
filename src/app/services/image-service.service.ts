import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ResponseInterface} from '../interfaces/response-interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }

  postImagePrediction(base64Image: string): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(environment.model_endpoint, {base64Image}, {responseType: 'json'});
  }

}