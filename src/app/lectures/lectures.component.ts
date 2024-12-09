import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';

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
  lecturerForm: FormGroup;
  lecturer: any[] = [];
  filteredLecturers: any[] = [];
  isModalOpen: boolean = false;
  lecturerDetails: any = {};


  lecturerFields = [

    { controlName: 'usersId', label: 'Lecturer Id', placeholder: 'EnterLecturer Id' },
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
    this.lecturerForm = this.fb.group({

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
  goToLecturerCv(id: number): void {
    this.router.navigate([`/student-cv/${id}`]);
  }
  ngOnInit(): void {

    this.getAllLecturers();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  cancel(): void {
    this.lecturerForm.reset();
    this.closeModal();
  }

  onSubmit(): void {
    if (this.lecturerForm.valid) {
      const formData = { ...this.lecturerForm.value };


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
      

      console.log('Sending lecturer data:', formData);

      this.userService.addLecturer(formData).subscribe(
        (response: any) => {
          console.log('Lecturer added successfully:', response);
          this.getAllLecturers();
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
      console.log('Form is invalid:', this.lecturerForm.errors);
      this.lecturerForm.markAllAsTouched();
    }
  }

  getAllLecturers(): void {
    this.userService.getLecturerUsers().subscribe(
      (respoce: any) => {
        if(Array.isArray(respoce) && respoce.length >0 ) {
          this.lecturer = respoce;
          this.filteredLecturers = [...this.lecturer];

        }
        else{
          console.error('No Lecturer found or Unexpected responce:', respoce);
          this.lecturer =[];
          this.filteredLecturers = [];
        }
      },
      (error) => {
        console.error('Error fetching lecturer:', error);
        alert('An error occurred while fetching lecturer');  
      }
    );
  }
  


  searchLecturers(searchTerm: string): void {
    this.filteredLecturers = this.lecturer.filter(
      (stu) =>
        stu.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stu.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  deleteSaff(userId: string): void { 

    this.userService.deleteUserById(userId).subscribe(
      () => {
        this.lecturer = this.lecturer.filter((lecturer) => lecturer.id !== userId);
        this.filteredLecturers = [...this.lecturer];
        alert('Lecturer deleted successfully!');
      },
      (error) => {
        console.error('Error deleting lecturer:', error);
        alert('An error occurre d while deleting the Lecturer.')
      }
    );
  
  
  }


  isInvalid(controlName: string): any {
    const control = this.lecturerForm.get(controlName);
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
