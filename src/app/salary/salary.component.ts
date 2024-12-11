import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';

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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent {
  accountDetails = {
    accountNumber: 0,
    bankName: '',
    branchName: ''
  };

  workingDays!: number;

  // Remove the duplicate salaryData declaration
  salaryData: Salary[] = [
    {
      basicSalary: 1000,
      deduction: 100,
      bonus: 200,
      allowances: 50,
      workingDays: 20,
      salaryStatus: 'Pending'
    }
  ];

  // Use the Salary interface for the 'element' parameter
  deleteSalary(element: Salary) {
    // Handle delete logic
  }

  saveSalary(element: Salary) {
    // Handle save logic
  }

  displayedColumns: string[] = ['basicSalary', 'deduction', 'bonus', 'allowances', 'workingDays', 'salaryStatus', 'actions'];

  submitAccountDetails() {
    // Handle submit logic
  }

  resetForm() {
    this.accountDetails = { accountNumber: 0, bankName: '', branchName: '' };
  }

  addWorkingDays() {
    // Handle adding working days logic
  }

  editSalary() {
    // Handle edit logic
  }
}
