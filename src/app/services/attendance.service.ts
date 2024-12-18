import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

// Define the UserAttendance model (optional but useful for type safety)
export interface UserAttendance {
  Id: string;
  UserId: string;
  Name: string;
  Role: string;
  Date: string;
  InTime: string | null;
  OutTime: string | null;
  Status: Status;
  Active: boolean;
}

// Enum for status
export enum Status {
  Absent = 1,
  Present = 2,
  LateCome = 3
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl: string = environment.apiUrl + 'UserAttendance'
  httpClient: any;
  


  constructor(private http: HttpClient) { }
  
  // Add user attendance
  addUserAttendance(userId: string, attendanceData: any): Observable<UserAttendance> {
    const url = `${this.baseUrl}/Add_User_Attendance?UserId=${userId}`;
    return this.http.post<UserAttendance>(url, attendanceData);
  }
  
  // Get all user attendance
  getAllUserAttendance(): Observable<UserAttendance[]> {
    const url = `${this.baseUrl}/Get_All_User_Attendance`;
    return this.http.get<UserAttendance[]>(url);
  }


  getAttendanceReport(userId:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Genarete_Report?userId=${userId}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  
   // New method to get filtered attendance report
   getFilteredAttendanceReport(userId: string, startDate: string, endDate: string) {
    const url = `${this.baseUrl}/Genarete_Report?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
    console.log('Requesting filtered attendance report with:', {
      userId,
      startDate,
      endDate,
    });
    
  
    return this.httpClient.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching filtered attendance report:', error);
        return throwError(() => new Error('Failed to fetch attendance data.'));
      })
    );
  }
  

  // Download PDF
  downloadPdf(userId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/Genarete_Report?userId=${userId}`, {
      responseType: 'blob',
    });
  }

 

  getAttendanceByUserAndDate(userId: string, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Get_User_Attendance?userId=${userId}&date=${date}`);
  }



  getReport(userId: string): Observable<any> {
    const url = `${this.baseUrl}/Genarete_Report?userId=${userId}`;
    return this.http.get<any>(url);
  }
  
  
}
