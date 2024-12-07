import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { isArray } from 'chart.js/helpers';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterOutlet],
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
  staffForm: any;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
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
  goToEmployeeCv(id: number): void {
    this.router.navigate([`/employee-cv/${id}`]);
  }
  ngOnInit(): void {
    this.getAllEmployees()
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
      const formData = { ...this.employeeForm.value };


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


      console.log('Sending employee data:', formData);

      this.userService.addEmployee(formData).subscribe(
        (response: any) => {
          console.log('Employee added Successfully:', response);
          this.getAllEmployees();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding employee:', error);
          if (error.status === 400) {
            alert('validation error:' + JSON.stringify(error.error));
          }
          else {
            alert('An Un Expected error occurred');
          }
        }
      );

    } else {
      console.log('Form is invalid:', this.employeeForm.errors);
      this.employeeForm.markAllAsTouched();
    }
  }
 
  getAllEmployees(): void {
    this.userService.getEmployeeUsers().subscribe(
      (responce: any) => {
        if (Array.isArray(responce) && responce.length > 0) {
          this.employee = responce;
          this.filteredUsers = [...this.employee];
        }
        else {
          console.error('No Employee found or Unexpected responce:', responce);
          this.employee = [];
          this.filteredUsers = [];
        }
      },
      (error) => {
        console.error('Error fetching Employee:', error);
        alert('An error occurred while fetching Employee');
      }

    );
  }

  searchEmployees(searchTerm: string): void {
    this.filteredUsers = this.employee.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  deleteEmployee(userId: string): void{
    this.userService.deleteUserById(userId).subscribe(
      () => {
        this.employee = this.employee.filter((employee)=> employee.id !== userId);
        this.filteredUsers = [...this.employee];
        alert('Employee deleted Successfully!');
      },   
      (error) => {
        console.error('Error deleting staff:', error);
        alert('An error occurre d while deleting the staff.')
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

