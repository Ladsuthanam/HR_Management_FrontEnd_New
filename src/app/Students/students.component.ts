
import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';




@Component({
  selector: 'app-students',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterOutlet, FormsModule,ReactiveFormsModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  userForm: FormGroup ;
  user : any[]= [];
  filteredUsers: any[] = [];
  isModalOpen: boolean = false;

  constructor(private fb: FormBuilder, private router: Router){
    
    this.userForm = this.fb.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nic: ['', Validators.required],
     
    })
  }
  ngOnInit(): void {
     
    }
    onSubmit(): void {
      if (this.userForm.valid) {
        const newStudent = this.userForm.value;
        console.log('Adding student:', newStudent);
        this.filteredUsers.push(newStudent);// Add the new student to the list
        this.userForm.reset();  // Reset the form
        this.closeModal();  // Close the modal after submitting
      }
    }
  cancle(){
    this.userForm.reset();
    this.closeModal();
  }



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
    if (searchTerm.trim() === '') {
      this.filteredUsers = this.user;  // Show all students if search term is empty
    } else {
      this.filteredUsers = this.user.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.userId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

}
