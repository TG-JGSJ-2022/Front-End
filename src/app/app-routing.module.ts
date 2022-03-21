import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoCaptureComponent } from './video-capture/video-capture.component';

const routes: Routes = [
  { path: 'home', component: VideoCaptureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
