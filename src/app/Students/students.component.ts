import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule
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
  
  constructor(private fb: FormBuilder, private studentService: StudentService) {
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
  
  

  searchStudents(searchTerm: string): void {
    this.filteredStudents = this.student.filter(
      (stu) =>
        stu.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stu.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getAllStudents(): void {
    this.studentService.GetAllStudent(1, 10).subscribe((response: any) => {
      this.student = response; 
      this.filteredStudents = [...this.student];
    });
  }

  deleteStudent(Id: number): void {
    this.studentService.DeleteStudent(Id).subscribe(() => {
      this.student = this.student.filter(student => student.Id !== Id);
      this.filteredStudents = [...this.student];
    });
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
