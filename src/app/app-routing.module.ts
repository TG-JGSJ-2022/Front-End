import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/shared/login/login.component';
import { VideoCaptureComponent } from './pages/student/video-capture/video-capture.component';
import { CoursesComponent } from './pages/teacher/courses/courses.component';
import { RealTimeEmotionsComponent } from './pages/teacher/real-time-emotions/real-time-emotions.component';
import { SessionsComponent } from './pages/teacher/sessions/sessions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // Teacher routes
  { path: 'courses', component: CoursesComponent },
  { path: 'modal', component: RealTimeEmotionsComponent}, 
  { path: 'sessions', component: SessionsComponent}, 
  // Student routes
  { path: 'capture', component: VideoCaptureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
