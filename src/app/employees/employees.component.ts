import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';  // Removed RouterLink from imports
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,RouterModule],  // Removed RouterLink from imports
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employeeForm: FormGroup;
  employee: any[] = [];
  filteredUsers: any[] = [];
  isModalOpen: boolean = false;
  employeeDetails: any = {};

  employeeFields = [
    { controlName: 'usersId', label: 'User ID', placeholder: 'Enter User ID' },
    { controlName: 'profile', label: 'Profile Image URL', placeholder: 'Enter Image URL' },
    { controlName: 'firstName', label: 'First Name', placeholder: 'Enter First Name' },
    { controlName: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name' },
    { controlName: 'nic', label: 'NIC', placeholder: 'Enter NIC (e.g., 123456789V or 123456789012)' },
    { controlName: 'email', label: 'Email', placeholder: 'Enter Email' },
    { controlName: 'phoneNumbe', label: 'Phone Number', placeholder: 'Enter Phone Number' },
    { controlName: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
    {
      controlName: 'merritalStatus',
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

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: ActivatedRoute) {
    this.employeeForm = this.fb.group({
      usersId: ['', Validators.required],
      profile: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nic: ['', [Validators.required, Validators.pattern('^(\\d{9}[vV]|\\d{12})$')]],
      email: ['', [Validators.required, Validators.email]],
      merritalStatus: ['', Validators.required],
      phoneNumbe: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const savedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    this.employee = [...savedEmployees];
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
      localStorage.setItem('employees', JSON.stringify(this.employee));
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
