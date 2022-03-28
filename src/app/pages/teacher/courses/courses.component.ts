import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor() { }

  courses: Array<Object> = [];

  // TODO :
  // This function should call the backend in order 
  // to fill the array of courses, but at this point the 
  // courses will be mocked
  fillTeacherCoursesArray(): void {
    this.courses = [
      {
        courseCode: "15160", 
        courseName: "Visualización de datos",
      },
      {
        courseCode: "15160", 
        courseName: "Introducción a la inteligencia artificial",
      },
      {
        courseCode: "15160",
        courseName: "Análisis de algoritmos",
      },
      {
        courseCode: "15160", 
        courseName: "Visualización de datos",
      },
      {
        courseCode: "15160", 
        courseName: "Introducción a la inteligencia artificial",
      },
      {
        courseCode: "15160", 
        courseName: "Análisis de algoritmos",
      }
    ];
  } 

  ngOnInit(): void {
    this.fillTeacherCoursesArray();
  }

}
