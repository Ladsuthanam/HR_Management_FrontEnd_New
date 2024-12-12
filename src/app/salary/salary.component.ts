import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { SalaryService } from '../services/salary.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-salary', 
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule

  ],
  
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  accountDetails: any[] = [];
  displayedColumns: string[] = ['name', 'id', 'role', 'email', 'accountNumber', 'bankName', 'branchName', 'actions'];
  accountForm!: FormGroup;
  selectedUserId!: string;
  isModalOpen = false;
  isEditMode = false;

  workingDaysForm!: FormGroup;
  workingDays = [
    { controlName: 'monday', label: 'Monday' },
    { controlName: 'tuesday', label: 'Tuesday' },
    { controlName: 'wednesday', label: 'Wednesday' },
    { controlName: 'thursday', label: 'Thursday' },
    { controlName: 'friday', label: 'Friday' },
    { controlName: 'saturday', label: 'Saturday' },
    { controlName: 'sunday', label: 'Sunday' }
  ];

  accountFields = [
    { controlName: 'accountNumber', label: 'Account Number', placeholder: 'Enter Account Number' },
    { controlName: 'bankName', label: 'Bank Name', placeholder: 'Enter Bank Name' },
    { controlName: 'branchName', label: 'Branch', placeholder: 'Enter Branch name' },
  ];

  constructor(private salaryService: SalaryService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadAccountDetails();
    this.initializeForm();
    this.initializeWorkingDaysForm();
  }

  initializeForm(): void {
    this.accountForm = this.fb.group({
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required]
    });
    this.workingDaysForm = this.fb.group({
      monday: [false],
      tuesday: [false],
      wednesday: [false],
      thursday: [false],
      friday: [false],
      saturday: [false],
      sunday: [false]
    });
  }
  initializeWorkingDaysForm(): void {
    this.workingDaysForm = this.fb.group({
      weekdays: [[], Validators.required] 
    });
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

  openAddAccountModal(userId: string): void {
    if (userId) {
      this.selectedUserId = userId;
      this.accountForm.reset();
      this.isModalOpen = true;
      this.isEditMode = false;
    } else {
      console.error('User ID is missing!');
    }
  }


  openEditAccountModal(userId: string, accountData: any): void {
    this.selectedUserId = userId;
    this.accountForm.patchValue(accountData);
    this.isModalOpen = true;
    this.isEditMode = true;
  }

  closeAddAccountModal(): void {
    this.isModalOpen = false;
  }

  onSubmitAccount(): void {
    if (this.accountForm.valid) {
      const accountDetails = this.accountForm.value;
      if (this.isEditMode) {
        this.salaryService.updateAccount(this.selectedUserId, accountDetails).subscribe({
          next: (response) => {
            console.log('Account updated:', response);
            this.closeAddAccountModal();
            this.loadAccountDetails();
          },
          error: (error) => {
            console.error('Error updating account:', error);
            alert(`An error occurred: ${error.message}`);
          }
        });
      } else {
        // Pass userId and accountDetails correctly
        this.salaryService.addAccount(this.selectedUserId, accountDetails).subscribe({
          next: (response) => {
            console.log('Account added:', response);
            this.closeAddAccountModal();
            this.loadAccountDetails();
          },
          error: (error) => {
            console.error('Error adding account:', error);
            alert(`An error occurred: ${error.message}`);
          }
        });
      }
    } else {
      this.accountForm.markAllAsTouched();
    }
  }
  
  onSubmitWorkingDays(): void {
    if (this.workingDaysForm.valid) {
      const weekdays = this.workingDaysForm.value.weekdays;  // An array of weekdays, e.g. [1, 2, 3, 4, 7]
      const userId = this.selectedUserId;
  
      // Call the service to add working days
      this.salaryService.addWorkingDays(userId, weekdays).subscribe({
        next: (response) => {
          console.log('Working days added:', response);
          this.loadWorkingDays();  // Optionally refresh the list of working days
        },
        error: (error) => {
          console.error('Error adding working days:', error);
          alert(`An error occurred: ${error.message}`);
        }
      });
    } else {
      this.workingDaysForm.markAllAsTouched();
    }
  }
  loadWorkingDays(): void {
    this.salaryService.getAllAccountDetails().subscribe({
      next: (data: any[]) => {
       
      },
      error: (err) => {
        console.error('Error fetching working days:', err);
      }
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.accountForm.get(controlName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

  editUser(element: any): void {
    this.openEditAccountModal(element.usersId, {
      accountNumber: element.accountNumber,
      bankName: element.bankName,
      branchName: element.branchName
    });
  }
  deleteUser(accountId: string): void {
    this.salaryService.deleteAccountDetails(accountId).subscribe({
      next: () => {
        console.log('Account deleted successfully');
        this.loadAccountDetails();
      },
      error: (err) => {
        console.error('Error deleting account:', err);
      }
    });
  }

  saveUser(element: any): void {
    console.log('Save action for:', element);
  }

  cancel(): void {
    this.accountForm.reset();
  }
}
