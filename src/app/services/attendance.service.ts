import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private baseUrl: string = 'http://localhost:5162/api/UserAttendance';

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
}
