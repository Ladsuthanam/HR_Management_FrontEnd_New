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

  constructor(private datePipe: DatePipe,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      this.fetchEmployeeDetails(userId);
    }
  }

  fetchEmployeeDetails(userId: string): void {
    this.employeeService.getEmployeeByUserId(userId).subscribe(
      (data:any) => {
        this.employee = data;
      },
      (error:any) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'MM/dd/yyyy') || 'Invalid Date';
  }
  
}
