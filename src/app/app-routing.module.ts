import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/shared/login/login.component';
import { VideoCaptureComponent } from './pages/student/video-capture/video-capture.component';
import { CoursesComponent } from './pages/teacher/courses/courses.component';
import { GraphicsPageComponent } from './pages/teacher/graphsTypes/graphics-page/graphics-page.component';

const routes: Routes = [
  { path: 'capture', component: VideoCaptureComponent },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
  { path: '', component: GraphicsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
