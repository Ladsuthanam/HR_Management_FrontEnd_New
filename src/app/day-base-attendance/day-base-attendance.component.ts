import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../services/attendance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-day-base-attendance',
  standalone: true, // Standalone component
  imports: [CommonModule, FormsModule],
  templateUrl: './day-base-attendance.component.html',
  styleUrl: './day-base-attendance.component.css'
})
export class DayBaseAttendanceComponent implements OnInit {

  userId: string = ''; 
  selectedDate: string = '';
  attendanceData: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  reportData: any;

  constructor(
    private http: HttpClient,
    private attendanceService: AttendanceService,
    private route: ActivatedRoute, // ActivatedRoute for reading params
    private router: Router
  ) {}

  ngOnInit(): void {
    // Read 'id' parameter from route
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('User ID from route:', this.userId);

    // Fetch initial report data
    this.fetchReportData();
    this.loadAttendance();
  }

  // Fetch attendance data for the user and date
  loadAttendance(): void {
    if (!this.selectedDate) {
      this.attendanceData = [];
      return;
    }
  
    this.errorMessage = '';
    this.isLoading = true;
  
    this.attendanceService.getAttendanceByUserAndDate(this.userId, this.selectedDate).subscribe({
      next: (data) => {
        this.isLoading = false;
        
        // Ensure data is an array, wrap in an array if it's a single object
        this.attendanceData = Array.isArray(data) ? data : [data];
        console.log('Attendance Data:', this.attendanceData);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load attendance data.';
        console.error('Error:', error);
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

  // Navigate back
  goBack(): void {
    this.router.navigateByUrl(`/attendanceStaff/${this.userId}`); // Replace :id with actual userId
  }

  // Filter report data based on selected date
  filterReportData(): void {
    if (this.selectedDate) {
      console.log('Filters Applied:', {
        userId: this.userId,
        date: this.selectedDate
      });
    }
  }

  // Format date utility
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  generateReport(): void {
    console.log('Generating report...');
  
    // Fetch the attendance report data
    this.attendanceService.getReport(this.userId).subscribe({
      next: (data) => {
        this.attendanceData = data;
        console.log('Report Data:', this.attendanceData);
  
        // Export report to Excel
        // this.exportToExcel();
      },
      error: (error) => {
        this.errorMessage = 'Error generating the report.';
        console.error('Error:', error);
      },
    });
  }
  
  // Export data to Excel
  // exportToExcel(): void {
  //   const fileName = 'Attendance_Report.xlsx';
  //   const sheetName = 'Attendance Data';
  
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.attendanceData);
  //   const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };
  
  //   workbook.Sheets[sheetName] = worksheet;
  //   workbook.SheetNames.push(sheetName);
  
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, fileName);
  // }
  
  // saveAsExcelFile(excelBuffer: any, excelFileName: string): void {
  //   const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  //   saveAs(data, excelFileName);
  // }
  
}
