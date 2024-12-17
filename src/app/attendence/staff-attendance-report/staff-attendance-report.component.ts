import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-staff-attendance-report',
  standalone: true,
  imports: [FormsModule,CommonModule,NgFor,RouterLink],
  providers: [DatePipe] ,
  templateUrl: './staff-attendance-report.component.html',
  styleUrls: ['./staff-attendance-report.component.css']
})
export class StaffAttendanceReportComponent implements OnInit {
  reportData: any = null;
  userId: string = '';
  startDate: string = '';
  endDate: string = '';
  isDownloading: boolean | undefined;

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

  fetchReportData(userId: string): void {
    this.attendanceService.getAttendanceReport(userId).subscribe(
      (data) => {
        console.log('Report Data:', data);
        this.reportData = {
          attendanceDetails: data.attendanceDetails.map((item: any) => ({
            ...item,
            date: this.formatDate(item.date) // Ensure consistent date format
          })),
          statusCount: data.statusCount
        };
      },
      (error) => {
        console.error('Error fetching report data:', error);
      }
    );
  }

  
  filterReportData(): void {
    if (this.startDate && this.endDate) {
      console.log('Filters Applied:', {
        userId: this.userId,
        startDate: this.startDate,
        endDate: this.endDate
      });
  
      // Convert the start and end dates to Date objects first
      const startDateObj = new Date(this.startDate);
      const endDateObj = new Date(this.endDate);
  
      // Check if the dates are valid
      if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        alert('Invalid date format. Please ensure the dates are in correct format.');
        return;
      }
  
      // Convert the start and end dates to ISO format (yyyy-MM-dd)
      const formattedStartDate = this.formatDate(startDateObj);
      const formattedEndDate = this.formatDate(endDateObj);
  
      this.attendanceService
        .getFilteredAttendanceReport(this.userId, formattedStartDate, formattedEndDate)
        .subscribe(
          (data) => {
            console.log('Filtered Report Data:', data);
            if (data.attendanceDetails && data.statusCount) {
              this.reportData = data;
            }
           
          },
          (error) => {
            console.error('Error fetching filtered report data:', error);
            alert('An error occurred while fetching the report. Please try again.');
          }
        );
    } else {
      alert('Please select both start and end dates.');
    }
  }
  
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  }
  
  
  
  downloadPdf(): void {
    this.isDownloading = true; // Set loading state to true
    this.attendanceService.downloadPdf(this.userId).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Attendance_Report_${this.userId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.isDownloading = false; // Reset loading state
      },
      (error) => {
        console.error('Error downloading PDF:', error);
        this.isDownloading = false; // Reset loading state
        alert('Failed to download the PDF report.');
      }
    );
  }
  
  gotoDaybasePage(){
    this.router.navigateByUrl('/dayBaseAttendance/:id');
  }

}
