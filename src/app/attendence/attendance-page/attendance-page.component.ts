import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; // For ngModel
import { MatTableDataSource } from '@angular/material/table'; // For MatTableDataSource
import { AttendanceService, UserAttendance, Status } from '../../services/attendance.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-attendance-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    FormsModule,
  ],
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.css']
})
export class AttendancePageComponent {
  selectedTab: string = 'staff';
  staffDisplayedColumns: string[] = ['id', 'firstName', 'role', 'inTime', 'outTime', 'status', 'active', 'report'];

  staffData = new MatTableDataSource<UserAttendance>([]);
  presentCount: number = 0;
  absentCount: number = 0;
  latecomeCount: number = 0;
  searchQuery: string = '';

  constructor(private attendanceService: AttendanceService,private router : Router) {}

  ngOnInit(): void {
    this.fetchStaffAttendance();
  }

  fetchStaffAttendance(): void {
    this.attendanceService.getAllUserAttendance().subscribe(
      (data) => {
        console.log('Fetched staff attendance data:', data); // Check the structure here
        if (data) {
          this.staffData.data = data;
          this.updateCount();
        } else {
          console.error('No data returned');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching staff attendance:', error);
      }
    );
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.updateCount();
  }

  updateCount(): void {
    this.staffData.filter = this.searchQuery.trim().toLowerCase();
    const data = this.staffData.filteredData;
    this.presentCount = data.filter((item: UserAttendance) => item.Status === Status.Present).length;
    this.absentCount = data.filter((item: UserAttendance) => item.Status === Status.Absent).length;
    this.latecomeCount = data.filter((item: UserAttendance) => item.Status === Status.LateCome).length;
  }

  applySearch(): void {
    this.staffData.filter = this.searchQuery.trim().toLowerCase();
    this.updateCount();
  }

  addUserAttendance(userId: string): void {
    const attendanceData = {
      userAttendanceRequestDtos: [
        {
          status: Status.Present,
          inTime: new Date().toISOString(),
          outTime: null
        }
      ]
    };

    this.attendanceService.addUserAttendance(userId, attendanceData).subscribe(
      (attendance) => {
        console.log('Attendance added:', attendance);
        this.fetchStaffAttendance(); 
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding attendance:', error);
      }
    );
  }

  saveAttendance(): void {
    alert('Attendance data saved!');
  }
  goToReport(id: string): void {
    this.router.navigate([`/attendanceStaff/${id}`]);
  }
}
