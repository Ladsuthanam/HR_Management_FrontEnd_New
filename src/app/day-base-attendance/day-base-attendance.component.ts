import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../services/attendance.service';
import { Router } from '@angular/router';
import { Comment } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-day-base-attendance',
  imports: [CommonModule, FormsModule],
  templateUrl: './day-base-attendance.component.html',
  styleUrl: './day-base-attendance.component.css'
})
export class DayBaseAttendanceComponent implements OnInit{

  userId: string = '69d8cc6d-b131-4031-9d33-139ec4586c8b'; 
  selectedDate: string = '';
  attendanceData: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  reportData: any;

  constructor(private http:HttpClient,private attendanceService: AttendanceService,private router: Router) {}
  ngOnInit(): void {
    this.fetchReportData();
  }

  // Fetch attendance data for the user and date
  loadAttendance(): void {
    if (!this.selectedDate) {
      this.attendanceData = [];
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.attendanceService.getAttendanceByUserAndDate(this.userId, this.selectedDate).subscribe({
      next: (data) => {
        this.attendanceData = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load attendance data.';
        console.error('Error:', error);
        this.isLoading = false;
      },
    });
  }

  fetchReportData(): void {
    this.attendanceService.getReport(this.userId).subscribe({
      next: (data) => {
        this.reportData = data;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching report data.';
        console.error('Error fetching report data:', error);
      },
    });
  }

  goBack(){
    this.router.navigateByUrl('/attendanceStaff/:id')
  }

}
