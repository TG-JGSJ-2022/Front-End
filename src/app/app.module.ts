
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { VideoCaptureComponent } from './pages/student/video-capture/video-capture.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { CoursesComponent } from './pages/teacher/courses/courses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


import { AppRoutingModule } from './app-routing.module';
import { WebcamModule } from 'ngx-webcam';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { Graph1Component } from './pages/teacher/graph1/graph1.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VideoCaptureComponent,
    CoursesComponent,
    NavBarComponent,
    Graph1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    TooltipModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
