
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
import { NavBarComponent } from './pages/shared/nav-bar/nav-bar.component';
import { SessionsComponent } from './pages/teacher/sessions/sessions.component';
import { AgreementComponent } from './pages/teacher/agreement/agreement.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { Graph1Component } from './pages/teacher/graphsTypes/avergeStudents/graph1/graph1.component';
import { GraphicsPageComponent } from './pages/teacher/graphsTypes/graphics-page/graphics-page.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Graph1ListComponent } from './pages/teacher/graphsTypes/avergeStudents/graph1-list/graph1-list.component';
import { SelectorGraph1Component } from'./pages/teacher/graphsTypes/avergeStudents/selector-grahp1/selector-grahp1.component';
import { MatTabsModule } from '@angular/material/tabs';
import { StudensConectedComponent } from './pages/teacher/graphsTypes/studens-conected/studens-conected.component';
import { EmotionStudentComponent } from './pages/teacher/graphsTypes/emotion-student/emotion-student.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VideoCaptureComponent,
    CoursesComponent,
    SessionsComponent,
    NavBarComponent,
    AgreementComponent,
    Graph1Component,
    GraphicsPageComponent,
    Graph1ListComponent,
    SelectorGraph1Component,
    StudensConectedComponent,
    EmotionStudentComponent,
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
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatListModule,
    ScrollingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
