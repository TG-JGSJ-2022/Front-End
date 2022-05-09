import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  public sessions: any = [];
  private username: string;
  private courseId: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router, 
    private readonly userService: UserServiceService,
  ) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('user');
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    this.userService.getCouseSessions(this.username, this.courseId)
        .subscribe( (data: any[]) => {
          this.sessions = data;
          console.log(data);
        }, (error) => {
          // this.router.navigate([`/courses`]);
        });
  }

  redirectToSession(index: number) {
    this.router.navigate([`/sesion/${this.sessions[index].id}`]);
  }

}
