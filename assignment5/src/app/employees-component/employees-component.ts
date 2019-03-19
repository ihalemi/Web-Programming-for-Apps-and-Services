import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';



@Component({
  selector: 'app-employees',
  templateUrl: './employees-component.html',
  styleUrls: ['./employees-component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  getEmployeesSub: any;
  loadingError: boolean;

  constructor(private service: EmployeeService) { 
    this.loadingError = false;  
  }

  ngOnInit() {
    this.getEmployeesSub = this.service.getEmployees().subscribe((employees) => {
      this.employees = employees;
    }, () => {
      this.loadingError = true;
    });
  }

  ngOnDestroy() {
    if(this.getEmployeesSub != null) {
      this.getEmployeesSub.unsubscribe();
    }
  }

}
