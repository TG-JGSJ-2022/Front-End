
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VideoCaptureComponent } from './pages/student/video-capture/video-capture.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { CoursesComponent } from './pages/teacher/courses/courses.component';

import { AppRoutingModule } from './app-routing.module';
import { WebcamModule } from 'ngx-webcam';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VideoCaptureComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }