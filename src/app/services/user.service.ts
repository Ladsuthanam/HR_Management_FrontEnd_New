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

  addUserAddress(userId: string, address: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Add_User_Address?UserId=${userId}`, address, this.getHeaders());
  }

  addUserOlevel(id: string, olevelData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Add_User_Olevel?Id=${id}`, olevelData, this.getHeaders());
  }

  addUserAlevel(id: string, alevelData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Add_User_Alevel?Id=${id}`, alevelData, this.getHeaders());
  }

  addUserExperience(id: string, experience: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Add_User_Experiance?id=${id}`, experience, this.getHeaders());
  }

  addUserHigherStudies(id: string, higherStudies: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Add_User_HigherStudies?Id=${id}`, higherStudies, this.getHeaders());
  }
  
  getUserAddress(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Get_User_Address?Id=${userId}`);
  }

  getUserOlevel(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Get_User_Olevel?Id=${userId}`);
  }

  getUserAlevel(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Get_User_Alevel?Id=${userId}`);
  }

  getUserExperience(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Get_User_Experiance?Id=${userId}`);
  }

  getUserHigherStudies(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Get_User_HigherStudies?Id=${userId}`);
  }
  deleteUserExperience(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete_User_Experiance?Id=${userId}`, this.getHeaders());
  }

  deleteUserHigherStudies(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete_User_HigherStudies?Id=${userId}`, this.getHeaders());
  }

  deleteUserAlevel(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete_User_Alevel?Id=${userId}`, this.getHeaders());
  }

  deleteUserOlevel(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete_User_Olevel?Id=${userId}`, this.getHeaders());
  }

  deleteUserAddress(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete_User_Address?Id=${userId}`, this.getHeaders());
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

   private readonly ApibaseUrl = 'http://localhost:5162/api/UserAttendance';
  // Fetch attendance report
  getAttendanceReport(userId: string): Observable<any> {
    return this.http.get(`${this.ApibaseUrl}/Genarete_Report?userId=${userId}`);
  }
   // New method to get filtered attendance report
   getFilteredAttendanceReport(userId: string, startDate: string, endDate: string): Observable<any> {
    const params = {
      userId: userId,
      startDate: startDate,
      endDate: endDate
    };

    // Make a GET request with query parameters
    return this.http.get<any>(`${this.ApibaseUrl}/Genarete_Report?userId= ${userId}`);
  }


  // Download PDF
  downloadPdf(userId: string): Observable<Blob> {
    return this.http.get(`${this.ApibaseUrl}/Genarete_Report?userId=${userId}`, {
      responseType: 'blob',
    });
  }

  getLoggedInUser(){
    
  }
}