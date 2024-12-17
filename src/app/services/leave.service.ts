import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = environment.apiUrl + 'LeaveType';
 private leaveUrl = environment.apiUrl + 'LeaveRequest'

  constructor(private http: HttpClient) { }

  getAllLeaveRequests(): Observable<any> {
    return this.http.get(`${this.leaveUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAllLeaveTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAll_LeaveType`)
      .pipe(
        catchError(this.handleError)
      );
  }


  addLeaveType(leaveType: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Add_LeaveType`, leaveType)
      .pipe(
        catchError(this.handleError)
      );
  }
 

  updateLeaveType(id: string, leaveType: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update_LeaveType?Id=${id}`, leaveType)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  deleteLeaveType(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete_LeaveType?Id=${id}`)
      .pipe(
        catchError(this.handleError)
      );

  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }
}
