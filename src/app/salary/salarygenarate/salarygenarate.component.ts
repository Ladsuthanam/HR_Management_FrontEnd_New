import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SalaryService } from '../../services/salary.service';

@Component({
  selector: 'app-salarygenarate',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule
  ],
  templateUrl: './salarygenarate.component.html',
  styleUrls: ['./salarygenarate.component.css']
})
export class SalarygenarateComponent implements OnInit {
  salaryDetails: any[] = [];
  displayedColumns: string[] = ['user_Id', 'userName', 'role', 'basicSalary', 'deduction', 'bonus', 'epf', 'etf', 'allowances', 'workingDays', 'netSalary', 'salaryStatus', 'actions'];
  salaryForm!: FormGroup;
  selectedUserId!: string;
  isModalOpen = false;
  isEditMode = false;
  searchQuery: string = '';

  salaryFields = [
    { controlName: 'basicSalary', label: 'Basic Salary', placeholder: 'Enter Basic Salary', type: 'number' },
    { controlName: 'deduction', label: 'Deduction', placeholder: 'Enter Deduction', type: 'number' },
    { controlName: 'bonus', label: 'Bonus', placeholder: 'Enter Bonus', type: 'number' },
    { controlName: 'allowances', label: 'Allowances', placeholder: 'Enter Allowances', type: 'number' },
    {
      controlName: 'salaryStatus',
      label: 'Salary Status',
      type: 'select',
      options: [
        { label: 'Pending', value: 1 },
        { label: 'Get', value: 2 }
      ]
    }
  ];

  constructor(private salaryService: SalaryService, private fb: FormBuilder, private router: Router) {}

  initializeForm(): void {
    this.salaryForm = this.fb.group({
      basicSalary: ["", Validators.required],
      deduction: [0],
      bonus: [0],
      allowances: [0],
      salaryStatus: [1]
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getAllSalaries();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  cancel(): void {
    this.salaryForm.reset();
    this.closeModal();
  }

  getAllSalaries(): void {
    this.salaryService.getAllSalaries().subscribe(
      data => {
        this.salaryDetails = data;
      },
      error => {
        console.error('Error fetching all salaries:', error);
      }
    );
  }

  openAddSalaryModal(userId: string): void {
    if (userId) {
      this.selectedUserId = userId;
      this.salaryForm.reset();
      this.isModalOpen = true;
      this.isEditMode = false;
    } else {
      console.error('User ID is missing!');
    }
  }

  openEditSalaryModal(userId: string): void {
    if (userId) {
      this.selectedUserId = userId;
      this.isEditMode = true;
      this.salaryService.getSalaryByUserId(userId).subscribe(
        data => {
          this.salaryForm.patchValue(data);
          this.isModalOpen = true;
        },
        error => {
          console.error('Error fetching salary data:', error);
        }
      );
    }
  }

  onSubmitSalary(): void {
    if (this.salaryForm.valid && this.selectedUserId) {
      const salaryRequest = this.salaryForm.value;
      
      const SalaryStatusMapping: { [key: number]: number } = {
        1: 1, 
        2: 2   
      };

      salaryRequest.salaryStatus = SalaryStatusMapping[salaryRequest.salaryStatus] || salaryRequest.salaryStatus;

      const basicSalary = parseFloat(salaryRequest.basicSalary) || 0;
      const deduction = parseFloat(salaryRequest.deduction) || 0;
      const bonus = parseFloat(salaryRequest.bonus) || 0;
      const allowances = parseFloat(salaryRequest.allowances) || 0;

      salaryRequest.netSalary = basicSalary + bonus + allowances - deduction;

      if (this.isEditMode) {
        // Update salary
        this.salaryService.updateSalary(this.selectedUserId, salaryRequest).subscribe(
          response => {
            console.log('Salary updated successfully:', response);
            this.getAllSalaries(); // Refresh the salary list
            this.closeModal(); // Close the modal
          },
          error => {
            console.error('Error updating salary:', error);
          }
        );
      } else {
        // Add new salary
        this.salaryService.addSalary(this.selectedUserId, salaryRequest).subscribe(
          response => {
            console.log('Salary added successfully:', response);
            this.getAllSalaries(); // Refresh the salary list
            this.closeModal(); // Close the modal
          },
          error => {
            console.error('Error adding salary:', error);
          }
        );
      }
    } else {
      console.warn('Form is invalid or User ID is missing');
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.salaryForm.get(controlName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }
}
