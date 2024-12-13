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


export class weekdaysRequest {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;

  constructor() {
    this.monday = false;
    this.tuesday = false;
    this.wednesday = false;
    this.thursday = false;
    this.friday = false;
    this.saturday = false;
    this.sunday = false;
  }
}

@Component({
  selector: 'app-workingdays',
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
  templateUrl: './workingdays.component.html',
  styleUrl: './workingdays.component.css'
})
export class WorkingdaysComponent {
  workingDetails: any[] = [];
  displayedColumns: string[] = ['user_Id', 'userName', 'role', 'weekdays', 'actions'];
  workingForm!: FormGroup;
  selectedUserId!: string;
  isModalOpen = false;
  isEditMode = false;
  searchQuery: string = '';

  workingDays = [
    { controlName: 'monday', label: 'Monday' },
    { controlName: 'tuesday', label: 'Tuesday' },
    { controlName: 'wednesday', label: 'Wednesday' },
    { controlName: 'thursday', label: 'Thursday' },
    { controlName: 'friday', label: 'Friday' },
    { controlName: 'saturday', label: 'Saturday' },
    { controlName: 'sunday', label: 'Sunday' }
  ];
  weekdaysMapping: { [key: number]: string } = {
    1: 'Sunday',
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday'
  };
  workidaysFields = [
    { controlName: 'workingdays', label: ' Working days', placeholder: 'Enter Week Days' },

  ];

  constructor(private salaryService: SalaryService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    
   this.loadWorkingDetails();
   this.initializeForm();
  }

  initializeForm(): void {
    this.workingForm = this.fb.group({
      monday: [false],
      tuesday: [false],
      wednesday: [false],
      thursday: [false],
      friday: [false],
      saturday: [false],
      sunday: [false]
    });
  }


  loadWorkingDetails(): void {
    this.salaryService. getAllWorkingDays().subscribe({
      next: (data: any[]) => {
        this.workingDetails = data;
        console.log('Account details:', this.workingDetails);
      },
      error: (err) => {
        console.error('Error fetching account details:', err);
      }
    });
  }


  openAddWorkingModal(userId: string): void {
    if (userId) {
      this.selectedUserId = userId;
      this.workingForm.reset();
      this.isModalOpen = true;
      this.isEditMode = false;
    } else {
      console.error('User ID is missing!');
    }
  }
  openEditWorkingModal(userId: string, workingdayData: any): void {
    this.selectedUserId = userId;
    this.workingForm.patchValue(workingdayData);
    this.isModalOpen = true;
    this.isEditMode = true;
  }
  closeAddWorkingModal(): void {
    this.isModalOpen = false;
  }

 
  mapWeekdaysToNames(formValues: any): weekdaysRequest {
    const weekdaysRequestObj: weekdaysRequest = {
      monday: !!formValues.monday,
      tuesday: !!formValues.tuesday,
      wednesday: !!formValues.wednesday,
      thursday: !!formValues.thursday,
      friday: !!formValues.friday,
      saturday: !!formValues.saturday,
      sunday: !!formValues.sunday
    };
  
    return weekdaysRequestObj; 
  }
  
  
  
  
  
  
  
  onSubmitWorkingDays(): void {
    if (this.workingForm.valid) {
      const weekdaysNames = this.mapWeekdaysToNames(this.workingForm.value);
  
      const requestPayload = {
        weekdays: [weekdaysNames] 
      };
  
      console.log('Request Payload:', requestPayload);
  
     
      if (!requestPayload.weekdays) {
        console.error('Invalid payload: User ID or weekdays are missing');
        return;
      }
  
      if (this.isEditMode) {
       
        this.salaryService.updateWorkingDays(this.selectedUserId, requestPayload).subscribe({
          next: (response) => {
            console.log('Successfully updated working days:', response);
            this.closeAddWorkingModal();
            this.loadWorkingDetails();
          },
          error: (error) => {
            console.error('Error updating working days:', error);
            alert(`An error occurred: ${error.message}`);
          }
        });
      } else {
      
        this.salaryService.addWorkingDays(this.selectedUserId, requestPayload).subscribe({
          next: (response) => {
            console.log('Successfully added working days:', response);
            this.closeAddWorkingModal();
            this.loadWorkingDetails();
          },
          error: (error) => {
            console.error('Error adding working days:', error);
            alert(`An error occurred: ${error.message}`);
          }
        });
      }
    } else {
      this.workingForm.markAllAsTouched();
      console.error('Form is invalid');
    }
  }
  
  
  




  
  isInvalid(controlName: string): boolean {
    const control = this.workingForm.get(controlName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }
  editUser(element: any): void {
    
    const weekdaysArray = element.weekdays; 
    this.openEditWorkingModal(element.userId, {
      monday: weekdaysArray.includes('2'),
      tuesday: weekdaysArray.includes('3'),
      wednesday: weekdaysArray.includes('4'),
      thursday: weekdaysArray.includes('5'),
      friday: weekdaysArray.includes('6'),
      saturday: weekdaysArray.includes('7'),
      sunday: weekdaysArray.includes('1')
    });
  }

  
  cancel(): void {
    this.workingForm.reset();
  }

}


