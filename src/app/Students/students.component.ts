import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { FilterPipe } from '../pipes/filter.pipe';
@Component({
  selector: 'app-students',
  standalone: true, 
  imports: [RouterOutlet, CommonModule, FormsModule,FilterPipe],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  searchTerm: string = '';
  attendanceRecords = [
    { id: 1, studentId: 101, firstName: 'John', date: new Date(), status: 'Present', isEditing: false },
    { id: 2, studentId: 102, firstName: 'Jane', date: new Date(), status: 'Absent', isEditing: false },
    { id: 3, studentId: 103, firstName: 'Alex', date: new Date(), status: 'Present', isEditing: false }
  ];

  constructor() {}

  ngOnInit(): void {}

  onSearch(event: Event): void {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    console.log('Search term:', this.searchTerm); // Optional: Log the search term
  }
  
  editAttendance(record: any): void {
    record.isEditing = true; 
  }

  // Save the edited record
  saveAttendance(record: any): void {
    record.isEditing = false; 
    console.log(`Attendance for ${record.firstName} saved with status: ${record.status}`);
    
  }

 
  cancelEdit(record: any): void {
    record.isEditing = false; 
  }

 
  onStatusChange(record: any): void {
    console.log(`Attendance status updated for ${record.firstName} to ${record.status}`);
   
  }

  // Delete attendance record
  deleteAttendance(recordId: number): void {
    this.attendanceRecords = this.attendanceRecords.filter(record => record.id !== recordId);
  }
}
