import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { AttendanceService } from '../../services/attendance.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-staff-attendance-report',
  standalone: true,
  imports: [FormsModule,CommonModule,NgFor,RouterLink],
  providers: [DatePipe] ,
  templateUrl: './staff-attendance-report.component.html',
  styleUrls: ['./staff-attendance-report.component.css']
})
export class StaffAttendanceReportComponent implements OnInit {
  // reportData: { attendanceDetails: any[]; statusCount: any[] } = { attendanceDetails: [], statusCount: [] };
  userId: string = '';
  startDate: string = '';
  endDate: string = '';
  isDownloading: boolean | undefined;
  attendanceDetails:any =[];
  statusCount: any = [];
  errorMessage: string = '';
  reportData:any =[];

  constructor(
    private route: ActivatedRoute,
    private attendanceService: AttendanceService,
    private datePipe: DatePipe ,
    private router: Router
  ) {



  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    
    if (this.userId) {
      this.fetchReportData(this.userId);
    }
  }
  exportToExcel(): void {
    const fileName = 'Staff Attendance Report.xlsx';
    const sheetName = 'Attendance Report';
    if (!this.reportData.attendanceDetails.length) {
      alert('No data available to export.');
      return;
    }

    // Step 1: Convert JSON to Sheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reportData.attendanceDetails);

    // Step 2: Create Workbook
    const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };
    workbook.Sheets[sheetName] = worksheet;
    workbook.SheetNames.push(sheetName);

    // Step 3: Generate Excel Buffer
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Step 4: Save File
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  // Save file using file-saver
  saveAsExcelFile(excelBuffer: any, excelFileName: string): void {
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, excelFileName);
  }
  fetchReportData(userId: string): void {
    this.attendanceService.getAttendanceReport(userId).subscribe({
      next: (data) => {
        console.log('Report Data:', data);
        this.reportData = {
          attendanceDetails: data?.attendanceDetails.map((item: any) => ({
            ...item,
            date: this.formatDate(new Date(item.date)), // Ensure consistent date format
          })) || [],
          statusCount: data?.statusCount || [],
        };
        this.attendanceDetails = this.reportData.attendanceDetails;
        this.statusCount = this.reportData.statusCount;
      },
      error: (error) => {
        console.error('Error fetching report data:', error);
        this.errorMessage = 'Failed to fetch attendance data. Please try again later.';
      },
    });
  }

  
  filterReportData(): void {
    if (!this.startDate || !this.endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const startDateObj = new Date(this.startDate);
    const endDateObj = new Date(this.endDate);

    // Validate dates
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      alert('Invalid date format. Please select valid dates.');
      return;
    }

    const formattedStartDate = this.formatDate(startDateObj);
    const formattedEndDate = this.formatDate(endDateObj);

    console.log('Filters Applied:', { userId: this.userId, startDate: formattedStartDate, endDate: formattedEndDate });

    this.attendanceService.getFilteredAttendanceReport(this.userId, formattedStartDate, formattedEndDate).subscribe({
      next: (data: any) => {
        console.log('Filtered Report Data:', data);
      
        this.attendanceDetails = this.reportData.attendanceDetails || [];
        this.statusCount = this.reportData.statusCount || [];

        if (!this.attendanceDetails.length) {
          alert('No attendance records found for the selected date range.');
        }
      },
      error: (error: any) => {
        console.error('Error fetching filtered report data:', error);
        alert('An error occurred while fetching the report. Please try again.');
      },
    });
  }

    
  
  
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  }
  
  
  
  downloadPdf(): void {
    this.isDownloading = true;
    this.attendanceService.downloadPdf(this.userId).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Attendance_Report_${this.userId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.isDownloading = false;
      },
      error: (error) => {
        console.error('Error downloading PDF:', error);
        this.isDownloading = false;
        alert('Failed to download the PDF report.');
      },
    });
  }
  
 

}
