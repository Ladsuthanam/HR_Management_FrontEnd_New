import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; // For ngModel
import { MatTableDataSource } from '@angular/material/table'; // For MatTableDataSource

@Component({
  selector: 'app-attendance-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.css']
})
export class AttendancePageComponent {
  selectedTab: string = 'student'; // Default to student table
  displayedColumns: string[] = ['id', 'firstName', 'inTime', 'outTime', 'status', 'active'];

  studentData = new MatTableDataSource([
    { id: 1, firstName: 'John Doe', inTime: '9:00 AM', outTime: '5:00 PM', status: 'Present', active: true },
    { id: 2, firstName: 'Jane Smith', inTime: '9:15 AM', outTime: '5:15 PM', status: 'Absent', active: false }
  ]);

  staffData = new MatTableDataSource([
    { id: 1, firstName: 'Mike Johnson', inTime: '9:10 AM', outTime: '5:10 PM', status: 'Present', active: true },
    { id: 2, firstName: 'Sara Lee', inTime: '9:20 AM', outTime: '5:20 PM', status: 'Latecome', active: false }
  ]);

  employeeData = new MatTableDataSource([
    { id: 1, firstName: 'James White', inTime: '9:05 AM', outTime: '5:05 PM', status: 'Absent', active: true },
    { id: 2, firstName: 'Emily Brown', inTime: '9:25 AM', outTime: '5:25 PM', status: 'Present', active: false }
  ]);

  lecturerData = new MatTableDataSource([
    { id: 1, firstName: 'Dr. William', inTime: '9:00 AM', outTime: '5:00 PM', status: 'Present', active: true },
    { id: 2, firstName: 'Prof. Harris', inTime: '9:30 AM', outTime: '5:30 PM', status: 'Absent', active: false }
  ]);

  presentCount: number = 0;
  absentCount: number = 0;
  latecomeCount: number = 0;
  searchQuery: string = '';

  // Method to select the active tab
  selectTab(tab: string) {
    this.selectedTab = tab;
    this.updateCount();
  }

  // Method to update status count
  updateCount() {
    const data = this.getCurrentDataSource();
    this.presentCount = data.filter((item: any) => item.status === 'Present').length;
    this.absentCount = data.filter((item: any) => item.status === 'Absent').length;
    this.latecomeCount = data.filter((item: any) => item.status === 'Latecome').length;
  }

  // Get current data based on the selected tab
  getCurrentDataSource() {
    switch (this.selectedTab) {
      case 'student': return this.studentData.filteredData;
      case 'staff': return this.staffData.filteredData;
      case 'employee': return this.employeeData.filteredData;
      case 'lecturer': return this.lecturerData.filteredData;
      default: return [];
    }
  }

  // Method to handle saving the data (can be extended to save in backend or local storage)
  saveAttendance() {
    // Logic to save attendance data
    alert('Attendance data saved!');
  }

  // Search method for filtering
  applySearch() {
    const query = this.searchQuery.toLowerCase();
    const dataSource = this.getCurrentDataSource();
    const filteredData = dataSource.filter((data: any) => 
      data.firstName.toLowerCase().includes(query) || data.id.toString().includes(query)
    );
    this.updateTableData(filteredData);
  }

  // Update table data when search is applied
  updateTableData(data: any) {
    switch (this.selectedTab) {
      case 'student': this.studentData.data = data; break;
      case 'staff': this.staffData.data = data; break;
      case 'employee': this.employeeData.data = data; break;
      case 'lecturer': this.lecturerData.data = data; break;
    }
  }
}
