import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-page',
  imports: [IonicModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  adminForm: FormGroup;
  admin: any[] = [];
  filteredAdmins: any[] = [];
  isModalOpen: boolean = false;
  adminDetails: any = {};


  adminFields = [

    { controlName: 'usersId', label: 'admin Id', placeholder: 'Enter admin Id' },
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
    this.adminForm = this.fb.group({

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
  goToAdminCv(id: number): void {
    this.router.navigate([`admin-cv/${id}`]);
  }
  ngOnInit(): void {

    this.getAllAdmins();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  cancel(): void {
    this.adminForm.reset();
    this.closeModal();
  }

  async onSubmit(): Promise<void>  {
    if (this.adminForm.valid) {
      const formData = { ...this.adminForm.value };


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
      if (formData.image instanceof File) {
        try {
          const imageUrl = await this.uploadToCloudinary(formData.image);
          formData.image = imageUrl;
        } catch (error) {
          console.error('Error uploading image to Cloudinary:', error);
          return;
        }
      }

      console.log('Sending admin data:', formData);

      this.userService.addAdmin(formData).subscribe(
        (response: any) => {
          console.log('admin added successfully:', response);
          this.getAllAdmins();
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
      console.log('Form is invalid:', this.adminForm.errors);
      this.adminForm.markAllAsTouched();
    }
  }

  getAllAdmins(): void {
    this.userService.getAdminUsers().subscribe(
      (respoce: any) => {
        if(Array.isArray(respoce) && respoce.length >0 ) {
          this.admin = respoce;
          this.filteredAdmins = [...this.admin];
        }
        else{
          console.error('No Admin found or Unexpected responce:', respoce);
          this.admin =[];
          this.filteredAdmins = [];
        }
      },
      (error) => {
        console.error('Error fetching admin:', error);
        alert('An error occurred while fetching admin');  
      }
    );
  }
  


  searchAdmins(searchTerm: string): void {
    this.filteredAdmins = this.admin.filter(
      (atn) =>
        atn.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        atn.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  deleteAdmin(userId: string): void { 

    this.userService.deleteUserById(userId).subscribe(
      () => {
        this.admin = this.admin.filter((admin) => admin.id !== userId);
        this.filteredAdmins = [...this.admin];
        alert('Admin deleted successfully!');
      },
      (error) => {
        console.error('Error deleting admin:', error);
        alert('An error occurre d while deleting the admin.')
      }
    );
  
  
  }

  isInvalid(controlName: string): any {
    const control = this.adminForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  // Helper function to format the date as 'YYYY-MM-DD'
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day

    return `${year}-${month}-${day}`;
  }
  private async uploadToCloudinary(file: File): Promise<string> {
    const url = 'https://api.cloudinary.com/v1_1/Unicom Tic /image/upload';  // Use your Cloudinary URL
    const formData = new FormData();
    formData.append('HR Management', file);
    formData.append('upload_preset', 'Unicom Tic');  // Replace with your upload preset

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;  // Return the URL of the uploaded image
  }
}



