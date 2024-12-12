import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { SalaryService } from '../services/salary.service';



export interface Salary {
  basicSalary: number;
  deduction: number;
  bonus: number;
  allowances: number;
  workingDays: number;
  salaryStatus: string;
}

@Component({
  selector: 'app-salary',
  imports: [


    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
  ],
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  accountDetails: any[] = [];
  displayedColumns: string[] = ['name', 'id', 'role', 'email', 'accountNumber', 'bankName', 'branchName', 'actions'];

  constructor(private salaryService: SalaryService) {}

  ngOnInit(): void {
    this.loadAccountDetails();
  }

  loadAccountDetails(): void {
    this.salaryService.getAllAccountDetails().subscribe({
      next: (data: any[]) => {
        this.accountDetails = data;
        console.log('Account details:', this.accountDetails);
      },
      error: (err) => {
        console.error('Error fetching account details:', err);
      }
    });
  }

  editUser(element: any): void {
    console.log('Edit action for:', element);
  }

  deleteUser(element: any): void {
    console.log('Delete action for:', element);
  }

  saveUser(element: any): void {
    console.log('Save action for:', element);
  }
}