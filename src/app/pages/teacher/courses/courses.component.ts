import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserServiceService) { }

  courses: any = [];
  username: string = ''; 
  userId: string = '';

  // TODO :
  // This function should call the backend in order 
  // to fill the array of courses, but at this point the 
  // courses will be mocked
  fillTeacherCoursesArray(): void {
    this.userService.getTeacherCourses(this.username, this.userId)
        .subscribe( (data) => {
          this.courses = data
          console.log(this.courses)
        }, (error) => {
          this.router.navigate(["/courses"]);
        });
  } 

  ngOnInit(): void {
    this.username = sessionStorage.getItem('user')
    this.userId = sessionStorage.getItem('id'); 

    this.fillTeacherCoursesArray();
  }

}
