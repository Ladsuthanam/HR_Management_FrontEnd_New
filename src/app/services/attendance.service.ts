import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl = 'http://localhost:5162/api/User/Get_All_User';

  constructor(private http: HttpClient) {}

  addAttendance(userId: string, attendanceData: any): Observable<any> {
    const url = `http://localhost:5162/api/UserAttendance/Add_User_Attendance?UserId=${userId}`;
    return this.http.post<any>(url, attendanceData);
  }
  

  getAllUsers(): Observable<any[]> {
    const url = 'http://localhost:5162/api/User/Get_All_User';
    return this.http.get<any[]>(url);
  }
  

  getAttendanceData(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Get_All_User/${role}`);
  }

   // Method to get all attendance data by date
   getAllAttendance(date: string): Observable<any[]> {
    const url = `${this.baseUrl}/Get_All_User_Attendance?date=${date}`;
    return this.http.get<any[]>(url);
  }
}
