import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { IonLabel, IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { controllers } from 'chart.js';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
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
  totalItems = 120;

  studentFields = [

    { controlName: 'studentId',label:'Student Id', placeholder:'Enter Student Id'},
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
  
  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) {
    this.studentForm = this.fb.group({

      studentId:['', Validators.required],
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
  goToStudentCv(id: number): void {
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
    this.studentForm.reset();
    this.closeModal();
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const formData = { ...this.studentForm.value };
  
      
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
      this.studentForm.markAllAsTouched(); 
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
        this.student = response;
        this.filteredStudents = [...this.student];
      } else {
        console.error('No students found or unexpected response:', response);
        this.student = []; 
        this.filteredStudents = [];
      } 
    },
    (error) => {
      console.error('Error fetching students:', error);
      alert('An error occurred while fetching students.');
    }
  );
}


searchStudents(searchTerm: string): void {
  this.filteredStudents = this.student.filter(
    (stu) =>
      stu.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  this.pageNumber = 1; 
  this.getAllStudents();
}


deleteStudent(studentId: number): void { 
  this.studentService.DeleteStudent(studentId).subscribe(
    () => {
     
      this.student = this.student.filter((student) => student.id !== studentId);
      this.filteredStudents = [...this.student]; 
      alert('Student deleted successfully!');
    },
    (error) => {
      console.error('Error deleting student:', error);
      alert('An error occurred while deleting the student.');
    }
  );
}

updateStudent(studentId: number): void {
 
  const updatedStudentData = { ...this.studentForm.value }; 

  this.studentService.UpdateStudent(studentId, updatedStudentData).subscribe(
    (response) => {
    
      this.student = this.student.map((student) =>
        student.id === studentId ? { ...student, ...updatedStudentData } : student
      );

      console.log(`Student with ID ${studentId} updated successfully.`);
      alert('Student updated successfully.');
    },
    (error) => {
      console.error(`Failed to update student with ID ${studentId}.`, error);
      alert('An error occurred while updating the student.');
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
