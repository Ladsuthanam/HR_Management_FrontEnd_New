
import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';




@Component({
  selector: 'app-students',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterOutlet, ReactiveFormsModule, RouterLink],
 
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  studentForm: FormGroup;
  student: any[] = [];
  filteredStudents: any[] = [];
  isModalOpen: boolean = false;

  studentFields = [
    { controlName: 'studentId', label: 'Student ID', placeholder: 'Enter Student ID' },
    { controlName: 'profile', label: 'Profile Image URL', placeholder: 'Enter Image URL' },
    { controlName: 'firstName', label: 'First Name', placeholder: 'Enter First Name' },
    { controlName: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name' },
    { controlName: 'nic', label: 'NIC', placeholder: 'Enter NIC (e.g., 123456789V or 123456789012)' },
    { controlName: 'email', label: 'Email', placeholder: 'Enter Email' },
    { controlName: 'phoneNumber', label: 'Phone Number', placeholder: 'Enter Phone Number' },
    { controlName: 'dob', label: 'Date of Birth', type: 'date' },
    {
      controlName: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      options: ['Single', 'Married', 'Divorced', 'Widowed'],
    },
    
    {
      controlName: 'gender',
      label: 'Gender',
      type: 'select',
      options: ['Male', 'Female', 'Other'],
    },
  ];
  
  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      studentId: ['', Validators.required],
      profile: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nic: ['', [Validators.required, Validators.pattern('^(\\d{9}[vV]|\\d{12})$')]],
      email: ['', [Validators.required, Validators.email]],
      maritalStatus: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    this.student = [...savedStudents];
    this.filteredStudents = [...this.student];
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
      const newEmployee = this.studentForm.value;
      this.student.push(newEmployee);
      localStorage.setItem('students', JSON.stringify(this.student));
      this.filteredStudents = [...this.student];
      this.studentForm.reset();
      this.closeModal();
    }
  }

  searchStudents(searchTerm: string): void {
    this.filteredStudents = this.student.filter(
      (stu) =>
        stu.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stu.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  isInvalid(controlName: string): any {
    const control = this.studentForm.get(controlName);
    return control?.invalid && control?.touched;
  }

}
