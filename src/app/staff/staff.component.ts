import { CommonModule, JsonPipe } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { controllers } from 'chart.js';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-staff',
  imports: [IonicModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent {
  staffForm: FormGroup;
  staff: any[] = [];
  filteredStaffs: any[] = [];
  isModalOpen: boolean = false;
  staffDetails: any = {};


  staffFields = [

    { controlName: 'usersId', label: 'Staff Id', placeholder: 'Enter Staff Id' },
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
    this.staffForm = this.fb.group({

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
  goToStaffCv(id: number): void {
    this.router.navigate([`/student-cv/${id}`]);
  }
  ngOnInit(): void {

    this.getAllStaffs();
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

      this.userService.addStaff(formData).subscribe(
        (response: any) => {
          console.log('Staff added successfully:', response);
          this.getAllStaffs();
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
      console.log('Form is invalid:', this.staffForm.errors);
      this.staffForm.markAllAsTouched();
    }
  }

  getAllStaffs(): void {
    this.userService.getStaffUsers().subscribe(
      (respoce: any) => {
        if(Array.isArray(respoce) && respoce.length >0 ) {
          this.staff = respoce;
          this.filteredStaffs = [...this.staff];

        }
        else{
          console.error('No Staff found or Unexpected responce:', respoce);
          this.staff =[];
          this.filteredStaffs = [];
        }
      },
      (error) => {
        console.error('Error fetching staff:', error);
        alert('An error occurred while fetching staff');  
      }
    );
  }
  


  searchStaffs(searchTerm: string): void {
    this.filteredStaffs = this.staff.filter(
      (stu) =>
        stu.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stu.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  deleteSaff(userId: string): void { 

    this.userService.deleteUserById(userId).subscribe(
      () => {
        this.staff = this.staff.filter((staff) => staff.id !== userId);
        this.filteredStaffs = [...this.staff];
        alert('Staff deleted successfully!');
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


