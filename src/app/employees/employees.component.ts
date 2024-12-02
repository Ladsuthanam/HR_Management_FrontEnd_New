import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterOutlet, ReactiveFormsModule, RouterLink],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employeeForm: FormGroup;
  employee: any[] = [];
  filteredUsers: any[] = [];
  isModalOpen: boolean = false;

  employeeFields = [
    { controlName: 'userId', label: 'User ID', placeholder: 'Enter User ID' },
    { controlName: 'firstName', label: 'First Name', placeholder: 'Enter First Name' },
    { controlName: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name' },
    { controlName: 'nic', label: 'NIC', placeholder: 'Enter NIC' },
    { controlName: 'email', label: 'Email', placeholder: 'Enter Email' },
    { controlName: 'profile', label: 'Profile Image', placeholder: 'Enter Image URL' },
    { controlName: 'phoneNumber', label: 'Phone Number', placeholder: 'Enter Phone Number' },
    { controlName: 'dob', label: 'Date of Birth', type: 'date' }
  ];

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nic: ['', Validators.required],
      email: ['', Validators.required],
      profile: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.filteredUsers = [...this.employee];
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  cancel(): void {
    this.employeeForm.reset();
    this.closeModal();
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee = this.employeeForm.value;
      this.employee.push(newEmployee);
      this.filteredUsers = [...this.employee];
      this.employeeForm.reset();
      this.closeModal();
    }
  }

  searchEmployees(searchTerm: string): void {
    this.filteredUsers = this.employee.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  isInvalid(controlName: string): any {
    const control = this.employeeForm.get(controlName);
    return control?.invalid && control?.touched;
  }
}

