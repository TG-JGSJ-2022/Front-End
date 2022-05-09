import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/shared/login/login.component';
import { VideoCaptureComponent } from './pages/student/video-capture/video-capture.component';
import { CoursesComponent } from './pages/teacher/courses/courses.component';
import { SessionsComponent } from './pages/teacher/sessions/sessions.component';
import { AgreementComponent } from './pages/teacher/agreement/agreement.component';
import { GraphicsPageComponent } from './pages/teacher/graphsTypes/graphics-page/graphics-page.component';


const routes: Routes = [
  // Teacher routes
  { path: 'courses', component: CoursesComponent },
  { path: 'sessions/:courseId', component: SessionsComponent },
  { path: 'sesion/:id', component: GraphicsPageComponent },
  // Student routes
  { path: 'capture', component: VideoCaptureComponent },
  { path: 'agreement', component: AgreementComponent },
  // Default
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
