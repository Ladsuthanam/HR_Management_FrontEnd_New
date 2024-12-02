import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterOutlet, FormsModule,ReactiveFormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  

  ngOnInit(): void {
   
  }

  employee = {
    firstName: '',
    lastName: '',
    nic: '',
    email: '',
    maritalStatus: '',
    phoneNumber: '',
    dateOfBirth: '',
    role: '',
    gender: ''
  };


  isModalOpen: boolean = false;

  // Method to open the modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Method to close the modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Method to handle save changes
  saveChanges(): void {

  }

  searchEmployees(searchTerm: string): void {
    console.log('Searching for:', searchTerm);
  }
}

