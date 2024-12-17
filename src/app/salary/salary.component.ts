import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { SalaryService } from '../services/salary.service';
import { Router, RouterModule } from '@angular/router';
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
  searchQuery: string = '';
  filteredAccountDetails: any[] = []; 

  

  accountFields = [
    { controlName: 'accountNumber', label: 'Account Number', placeholder: 'Enter Account Number' },
    { controlName: 'bankName', label: 'Bank Name', placeholder: 'Enter Bank Name' },
    { controlName: 'branchName', label: 'Branch', placeholder: 'Enter Branch name' },
  ];

  constructor(private salaryService: SalaryService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loadAccountDetails();
    this.initializeForm();
    this.filteredAccountDetails = this.accountDetails; 
   
  }

  goToWorkingDays(): void {
    this.router.navigate([`workingdays`]);
  }
  goToSalaryGenaratePage(): void{
    this.router.navigate(['salaryGenarate'])
  }

  initializeForm(): void {
    this.accountForm = this.fb.group({
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required]
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

  onSearch(searchValue: string): void {
    this.searchDetails(searchValue);
  }
  
  searchDetails(searchValue: string): void {
    const lowerSearch = searchValue.toLowerCase();
    
    // Filter logic with type conversion to handle non-string values
    this.filteredAccountDetails = this.accountDetails.filter((item) =>
      (item.users_Id && String(item.users_Id).toLowerCase().includes(lowerSearch)) ||
      (item.accountNumber && String(item.accountNumber).toLowerCase().includes(lowerSearch)) ||
      (item.branchName && String(item.branchName).toLowerCase().includes(lowerSearch))
    );
  }
  
  
  
  generateSalary(): void {
    
  }
  
  selectWorkingDays(): void {
    
  }
  
}
