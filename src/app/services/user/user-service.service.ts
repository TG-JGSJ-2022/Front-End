import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  API_ENDPOINT_LOGIN: string = environment.api_login;
  API_ENDPOINT_COURSES: string = environment.api_courses;
  API_ENDPOINT_SESION_DATA:string =  environment.api_sesion_data;

  login(username: string, password: string) {

    const formHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');

    const body = {'user': username, 'password': password};

    return this.http.post(this.API_ENDPOINT_LOGIN, body, {
      headers: formHeaders,
      withCredentials: true
    });
  }

  getTeacherCourses(username: string, userId: string | number) {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get(this.API_ENDPOINT_COURSES + `?user=${username}&id=${userId}`, {
      headers: headers,
      withCredentials:true
    });
  }

  logout(){
    // const api_endpoint_logout: string = environment.api_logout;

  }

  getDataSesion(id:number){
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get(this.API_ENDPOINT_SESION_DATA+`?id=${id}`, {

    });
  }

}
