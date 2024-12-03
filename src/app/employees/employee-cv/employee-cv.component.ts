import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet,ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-employee-cv',
  imports: [CommonModule,FormsModule],
  templateUrl: './employee-cv.component.html',
  styleUrl: './employee-cv.component.css',
  providers: [DatePipe]
})
export class EmployeeCvComponent implements OnInit{
  employee: any;

  constructor(private route: ActivatedRoute) {}

  
  ngOnInit(): void {
    
    const employeeId = this.route.snapshot.paramMap.get('employeeId');
    if (employeeId) {
      // Fetch student data from local storage
      const employees = JSON.parse(localStorage.getItem('employees') || '[]');
      this.employee = employees.find((emp: any) => emp.employeeId === employeeId);

      if (!this.employee) {
        console.error('Employee not found with ID:', employeeId);
      }
    } else {
      console.error('No employeeId found in route parameters.');
    }
  }
}
