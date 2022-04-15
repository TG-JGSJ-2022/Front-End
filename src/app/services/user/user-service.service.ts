import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    
    const api_endpoint_login: string = environment.api_login;

    const formHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json'); 

    const body = {'user': username, 'password': password};

    return this.http.post(api_endpoint_login, body, {
      headers: formHeaders,
      withCredentials: true
    });
  }

}
