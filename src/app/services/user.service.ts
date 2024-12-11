import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:5162/api/User';


  constructor(private http: HttpClient) { }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Add-Employee`, employee, this.getHeaders());
  }

  addStaff(staff: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Add-Staff`, staff, this.getHeaders());
  }

  addAdmin(admin: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Add-Admin`, admin, this.getHeaders());
  }

  addLecturer(lecturer : any) : Observable<any>{
    return this.http.post(`${this.baseUrl}/Add- Lecturers`,lecturer , this.getHeaders());

  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Get_All_User`);
  }

  getLecturerUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Get_Lecturer_User`);
  }
  
  getEmployeeUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Get_Employee_User`);
  }
  getStaffUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Get_Staff_User`);
  }

  getAdminUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Get_Admin_User`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  deleteUserById(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }
  
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getLoggedInUser(){
    
  }
}