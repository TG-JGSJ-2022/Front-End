import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  public courseName: string;
  public sessions: any = [];
  private username: string;
  private courseId: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserServiceService,
    private location: Location
  ) { }

  // TODO : Sort sessions in asending order based on date
  ngOnInit(): void | Promise<boolean> {
    this.username = sessionStorage.getItem('user');
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.courseName = sessionStorage.getItem('courseName');

    if (!this.courseName) return this.router.navigate(['/courses']);

    this.userService.getCouseSessions(this.username, this.courseId)
      .subscribe((data: any[]) => {
        this.sessions = data;
        console.log(data);
      }, (error) => {
        this.router.navigate([`/courses`]);
      });
  }

  redirectToSession(index: number) {
    this.router.navigate([`/sesion/${this.sessions[index].id}`]);
  }

  last() {
    this.location.back();
  }

  backToCourses() {
    this.router.navigate([`/courses`]);
  }
}
