import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  API_ENDPOINT_LOGIN: string = environment.api_login;
  API_ENDPOINT_LOGOUT: string = environment.api_logout;
  API_ENDPOINT_COURSES: string = environment.api_courses;
  API_ENDPOINT_COUSE_SESSIONS: string = environment.api_course_sessions;
  API_ENDPOINT_SESION_DATA: string =  environment.api_sesion_data;

  login(username: string, password: string) {

    const formHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');

    const body = {'user': username, 'password': password};

    return this.http.post(this.API_ENDPOINT_LOGIN, body, {
      headers: formHeaders,
      withCredentials: true
    });
  }


  logout(){
    const formHeaders = new HttpHeaders()
    .append('Content-Type', 'application/json');
    return this.http.post(this.API_ENDPOINT_LOGOUT, {}, {
      headers: formHeaders,
      withCredentials: true
    });

  }

  getCouseSessions(username:string, courseId: string) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.get(this.API_ENDPOINT_COUSE_SESSIONS + `?user=${username}&courseId=${courseId}`, {
      headers: headers,
      withCredentials: true
    });
  }

  getDataSesion(id:number){
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.get(this.API_ENDPOINT_SESION_DATA+`?id=${id}`, {
      headers: headers,
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
}
