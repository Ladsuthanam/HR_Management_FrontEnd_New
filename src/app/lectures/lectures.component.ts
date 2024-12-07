import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lectures',
  imports: [IonicModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './lectures.component.html',
  styleUrl: './lectures.component.css'
})
export class LecturesComponent {
  staffForm: FormGroup;
  staff: any[] = [];
  filteredStaffs: any[] = [];
  isModalOpen: boolean = false;
  staffDetails: any = {};
  pageSize=12;
  pageNumber=1;
  totalItems = 120;

  staffFields = [

    { controlName: 'usersId',label:'Staff Id', placeholder:'Enter Staff Id'},
    { controlName: 'image', label: 'Profile Image URL', placeholder: 'Enter Image URL' },
    { controlName: 'firstName', label: 'First Name', placeholder: 'Enter First Name' },
    { controlName: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name' },
    { controlName: 'nic', label: 'NIC', placeholder: 'Enter NIC (e.g., 123456789V or 123456789012)' },
    { controlName: 'email', label: 'Email', placeholder: 'Enter Email' },
    { controlName: 'phoneNumber', label: 'Phone Number', placeholder: 'Enter Phone Number' },
    { controlName: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
    {controlName:'password',label:'Password', placeholder:'Enter new password'},
    {
      controlName: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      options: [
        { label: 'Single', value: 1 },
        { label: 'Married', value: 2 },
        { label: 'Divorced', value: 3 },
        { label: 'Widowed', value: 4 },
      ],
    },
    {
      controlName: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { label: 'Male', value: 1 },
        { label: 'Female', value: 2 },
        { label: 'Other', value: 3 },
      ],
    },
  ];
  
  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) {
    this.staffForm = this.fb.group({

      usersId:['', Validators.required],
      image: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nic: ['', [Validators.required, Validators.pattern('^(\\d{9}[vV]|\\d{12})$')]],
      email: ['', [Validators.required, Validators.email]],
      maritalStatus: ['', Validators.required],
      mobile: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      password:['', Validators.required],
    });
  }
  goToStaffCv(id: number): void {
    this.router.navigate([`/student-cv/${id}`]);
  }
  ngOnInit(): void {
 
    this.getAllStudents(); 
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  cancel(): void {
    this.staffForm.reset();
    this.closeModal();
  }

  onSubmit(): void {
    if (this.staffForm.valid) {
      const formData = { ...this.staffForm.value };
  
      
      const maritalStatusMapping: { [key: number]: number } = { 
        1: 1, 
        2: 2, 
        3: 3, 
        4: 4  
      };
      const genderMapping: { [key: number]: number } = { 
        1: 1,
        2: 2, 
        3: 3 
      };
  
      console.log('Marital Status:', formData.maritalStatus);
console.log('Gender:', formData.gender);

      formData.maritalStatus = maritalStatusMapping[formData.maritalStatus];
      formData.gender = genderMapping[formData.gender];

      console.log('Mapped Marital Status:', formData.maritalStatus);
console.log('Mapped Gender:', formData.gender);

      if (!formData.maritalStatus) {
        console.error('Invalid marital status');
        formData.maritalStatus = 0; 
      }
      if (!formData.gender) {
        console.error('Invalid gender');
        formData.gender = 0; 
      }
  
   
      formData.dateOfBirth = this.formatDate(new Date(formData.dateOfBirth));
      formData.isDeleted = false;
  
      console.log('Sending staff data:', formData);
  
      this.studentService.AddStudent(formData).subscribe(
        (response) => {
          console.log('Staff added successfully', response);
          this.getAllStudents();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding staff:', error);
          if (error.status === 400) {
            alert('Validation error: ' + JSON.stringify(error.error));
          } else {
            alert('An unexpected error occurred');
          }
        }
      );
    } else {
      console.log('Form is invalid:', this.staffForm.errors);
      this.staffForm.markAllAsTouched(); 
    }
  }
  
  

  
onPageChange(event: any): void {
  const { pageIndex, pageSize } = event;
  this.pageNumber = pageIndex + 1; 
  this.pageSize = pageSize;
  this.getAllStudents(); 
}


getAllStudents(): void {
  this.studentService.GetAllStudents(this.pageNumber, this.pageSize).subscribe(
    (response: any) => {
      if (Array.isArray(response) && response.length > 0) {
        this.staff= response;
        this.filteredStaffs = [...this.staff];
      } else {
        console.error('No staffs found or unexpected response:', response);
        this.staff = []; 
        this.filteredStaffs = [];
      } 
    },
    (error) => {
      console.error('Error fetching staffs:', error);
      alert('An error occurred while fetching staffs.');
    }
  );
}


searchStaffs(searchTerm: string): void {
  this.filteredStaffs = this.staff.filter(
    (stu) =>
      stu.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  this.pageNumber = 1; 
  this.getAllStudents();
}


deleteStaff(usersId: number): void { 
  this.studentService.DeleteStudent(usersId).subscribe(
    () => {
     
      this.staff = this.staff.filter((staff) => staff.id !== usersId);
      this.filteredStaffs = [...this.staff]; 
      alert('Staff deleted successfully!');
    },
    (error) => {
      console.error('Error deleting staff:', error);
      alert('An error occurred while deleting the staff.');
    }
  );
}

updateStaff(usersId: number): void {
 
  const updatedStudentData = { ...this.staffForm.value }; 

  this.studentService.UpdateStudent(usersId, updatedStudentData).subscribe(
    (response) => {
    
      this.staff = this.staff.map((staff) =>
        staff.id === usersId ? { ...staff, ...updatedStudentData } : staff
      );

      console.log(`Staff with ID ${usersId} updated successfully.`);
      alert('Staff updated successfully.');
    },
    (error) => {
      console.error(`Failed to update staff with ID ${usersId}.`, error);
      alert('An error occurred while updating the staff.');
    }
  );
}


  isInvalid(controlName: string): any {
    const control = this.staffForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  // Helper function to format the date as 'YYYY-MM-DD'
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day

    return `${year}-${month}-${day}`;
  }

}
