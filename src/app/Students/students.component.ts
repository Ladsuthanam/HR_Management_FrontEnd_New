import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  isModalOpen = false;
  searchInput: string = '';
  students: any[] = []; // Array to hold the list of students
  newStudent: any = {
    userId: '',
    firstName: '',
    lastName: '',
    nic: '',
    email: '',
    profileImage: '',
    phoneNumber: ''
  };

  // Toggle modal visibility
  openModal() {
    console.log('Modal should open');
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Adding student
  addStudent() {
    if (this.newStudent) {
      this.students.push({ ...this.newStudent }); // Add a copy of newStudent to the students array
      this.closeModal(); // Close the modal after adding the student
      this.newStudent(); // Clear the form after submission
    }
  }

  

  // Search functionality
  searchStudents(query: string) {
    if (!query) {
      console.log("Returning all students:", this.students);
      return this.students; // Return the whole list of students
    }

    const filteredStudents = this.students.filter((student: { firstName: string; lastName: string; email: string; userId: string; }) =>
      student.firstName.toLowerCase().includes(query.toLowerCase()) ||
      student.lastName.toLowerCase().includes(query.toLowerCase()) ||
      student.email.toLowerCase().includes(query.toLowerCase()) ||
      student.userId.toLowerCase().includes(query.toLowerCase())
    );
    
    console.log("Filtered students:", filteredStudents);
    return filteredStudents; // Return filtered list of students
  }

  // View student details
  viewDetails(student: any) {
    console.log(student);  // You can display details in a modal or log it
    // Example: open a detailed modal or navigate to another page with details
  }
}
