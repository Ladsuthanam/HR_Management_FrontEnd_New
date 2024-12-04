import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StudentCvComponent } from './student-cv/student-cv.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,MatPaginatorModule,
    StudentCvComponent
   
    
  ],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [StudentService]
})
export class StudentsComponent implements OnInit {

  studentForm: FormGroup;
  student: any[] = [];
  filteredStudents: any[] = [];
  isModalOpen: boolean = false;
  studentDetails: any = {};
  pageSize=12;
  pageNumber=1;
  totalItems = 0;

  studentFields = [
 
    { controlName: 'image', label: 'Profile Image URL', placeholder: 'Enter Image URL' },
    { controlName: 'firstName', label: 'First Name', placeholder: 'Enter First Name' },
    { controlName: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name' },
    { controlName: 'nic', label: 'NIC', placeholder: 'Enter NIC (e.g., 123456789V or 123456789012)' },
    { controlName: 'email', label: 'Email', placeholder: 'Enter Email' },
    { controlName: 'mobile', label: 'Phone Number', placeholder: 'Enter Phone Number' },
    { controlName: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
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
  
  constructor(private fb: FormBuilder, private studentService: StudentService, private router: ActivatedRoute) {
    this.studentForm = this.fb.group({
     
      image: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nic: ['', [Validators.required, Validators.pattern('^(\\d{9}[vV]|\\d{12})$')]],
      email: ['', [Validators.required, Validators.email]],
      maritalStatus: ['', Validators.required],
      mobile: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getStudentDetails(id);
      }
    });
    this.getAllStudents(); 
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  cancel(): void {
    this.studentForm.reset();
    this.closeModal();
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const formData = { ...this.studentForm.value };
  
      // Map `maritalStatus` and `gender` to numeric values
      const maritalStatusMapping: { [key: string]: number } = { Single: 1, Married: 2, Divorced: 3, Widowed: 4 };
      const genderMapping: { [key: string]: number } = { Male: 1, Female: 2, Other: 3 };
  
      formData.maritalStatus = maritalStatusMapping[formData.maritalStatus];
      formData.gender = genderMapping[formData.gender];

      if (!formData.maritalStatus) {
        console.error('Invalid marital status');
        formData.maritalStatus = 0; // Default or error value
      }
      if (!formData.gender) {
        console.error('Invalid gender');
        formData.gender = 0; // Default or error value
      }
  
      // Format `dateOfBirth` to match the expected backend format
      formData.dateOfBirth = this.formatDate(new Date(formData.dateOfBirth));
      formData.isDeleted = false;
  
      console.log('Sending student data:', formData);
  
      this.studentService.AddStudent(formData).subscribe(
        (response) => {
          console.log('Student added successfully', response);
          this.getAllStudents();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding student:', error);
          if (error.status === 400) {
            alert('Validation error: ' + JSON.stringify(error.error));
          } else {
            alert('An unexpected error occurred');
          }
        }
      );
    } else {
      console.log('Form is invalid:', this.studentForm.errors);
      this.studentForm.markAllAsTouched(); // Mark invalid fields for better UX
    }
  }
  
  

  // Updated `onPageChange` to handle pagination
onPageChange(event: any): void {
  const { pageIndex, pageSize } = event;
  this.pageNumber = pageIndex + 1; // pageIndex is zero-based, so we add 1
  this.pageSize = pageSize;
  this.getAllStudents(); // Call API with updated pagination
}

// Updated `getAllStudents` method to handle paginated data fetch
getAllStudents(): void {
  this.studentService.GetAllStudents(this.pageNumber, this.pageSize).subscribe(
    (response: any) => {
      if (Array.isArray(response) && response.length > 0) {
        this.student = response;
        this.filteredStudents = [...this.student];
      } else {
        console.error('No students found or unexpected response:', response);
        this.student = []; 
        this.filteredStudents = [];
      } // Assuming the API returns the total count of students
    },
    (error) => {
      console.error('Error fetching students:', error);
      alert('An error occurred while fetching students.');
    }
  );
}

// Modify `searchStudents` to reset pagination when searching
searchStudents(searchTerm: string): void {
  this.filteredStudents = this.student.filter(
    (stu) =>
      stu.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset pagination when searching
  this.pageNumber = 1; // Always reset to the first page
  this.getAllStudents();
}


deleteStudent(studentId: number): void { // Use string since the studentId appears to be a UUID (string)
  this.studentService.DeleteStudent(studentId).subscribe(
    () => {
      // Remove the student from the list after deletion
      this.student = this.student.filter((student) => student.id !== studentId);
      this.filteredStudents = [...this.student]; // Update the filtered list if necessary
      alert('Student deleted successfully!');
    },
    (error) => {
      console.error('Error deleting student:', error);
      alert('An error occurred while deleting the student.');
    }
  );
}

 
  getStudentDetails(studentId: string): void {
    this.studentService.GetStudentById(studentId).subscribe(
      (response) => {
        this.studentDetails = response;
      },
      (error) => {
        console.error(`Error fetching student details with ID ${studentId}:`, error);
      }
    );
  }
  
  
  

  isInvalid(controlName: string): any {
    const control = this.studentForm.get(controlName);
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
