import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';



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
  filteredEmployees: any[] = [];
  isModalOpen: boolean = false;
  employeeDetails: any = {};

  employeeFields = [

    { controlName: 'usersId', label: 'Employee Id', placeholder: 'Enter Employee Id' },
    { controlName: 'image', label: 'Profile Image URL', placeholder: 'Enter Image URL' },
    { controlName: 'firstName', label: 'First Name', placeholder: 'Enter First Name' },
    { controlName: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name' },
    { controlName: 'nic', label: 'NIC', placeholder: 'Enter NIC (e.g., 123456789V or 123456789012)' },
    { controlName: 'email', label: 'Email', placeholder: 'Enter Email' },
    { controlName: 'phoneNumber', label: 'Phone Number', placeholder: 'Enter Phone Number' },
    { controlName: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
    { controlName: 'password', label: 'Password', placeholder: 'Enter new password' },
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

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.employeeForm = this.fb.group({

      usersId: ['', Validators.required],
      image: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nic: ['', [Validators.required, Validators.pattern('^(\\d{9}[vV]|\\d{12})$')]],
      email: ['', [Validators.required, Validators.email]],
      maritalStatus: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  goToEmployeeCv(id: number): void {
    this.router.navigate([`/student-cv/${id}`]);
  }
  ngOnInit(): void {

    this.getAllEmployees();
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
          console.log('Employee added successfully:', response);
          this.getAllEmployees();
          this.closeModal();
        },
        (error)=>{
          console.error('Error added Successfully', error);
          if(error.status === 400){
            alert('validation error:' + JSON.stringify(error.error));
          }else{
            alert('An une xpected error occurred');
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
      (respoce: any) => {
        if(Array.isArray(respoce) && respoce.length >0 ) {
          this.employee = respoce;
          this.filteredEmployees = [...this.employee];

        }
        else{
          console.error('No Employee found or Unexpected responce:', respoce);
          this.employee =[];
          this.filteredEmployees = [];
        }
      },
      (error) => {
        console.error('Error fetching employee:', error);
        alert('An error occurred while fetching employee');  
      }
    );
  }
  


  searchEmployees(searchTerm: string): void {
    this.filteredEmployees = this.employee.filter(
      (emy) =>
        emy.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emy.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  deleteEmployee(userId: string): void { 

    this.userService.deleteUserById(userId).subscribe(
      () => {
        this.employee = this.employee.filter((employee) => employee.id !== userId);
        this.filteredEmployees = [...this.employee];
        alert('Employee deleted successfully!');
      },
      (error) => {
        console.error('Error deleting employee:', error);
        alert('An error occurre d while deleting the employee.')
      }
    ); 
  }



  isInvalid(controlName: string): any {
    const control = this.employeeForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  // Helper function to format the date as 'YYYY-MM-DD'
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 

    return `${year}-${month}-${day}`;
  }

}

