import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-emotion-student',
  templateUrl: './emotion-student.component.html',
  styleUrls: ['./emotion-student.component.css']
})



export class EmotionStudentComponent implements AfterViewInit{
  @Input()
  public sesionId:number;
  public student: string;
  public listStudents: any;
  public response: any;
  public dataSource = new MatTableDataSource([{
    nombre: "",
    fecha: "",
    emocion: ""
  }]);
  // public dataSource: any = [{
  //   nombre: "",
  //   fecha: "",
  //   emocion: ""
  // }];
  displayedColumns: string[] = ['nombre', 'fecha', 'emocion'];
  constructor(private userService: UserServiceService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.userService.getDataSesion(this.sesionId).subscribe(response => {

      this.listStudents = response["students"];
      this.response = response;
      // this.example()
    }, (error) => {

    })
  }
  public table() {
    let dataSource = []
    console.log(this.response["data"]);
    this.response["data"].forEach(data => {
      if (data["nombre"] == this.student) {
        dataSource.push(data)
      }
    })
    console.log(this.dataSource)
    this.dataSource =  new MatTableDataSource(dataSource);
    this.dataSource.paginator = this.paginator;
  }

}
