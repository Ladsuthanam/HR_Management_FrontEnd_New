import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5162/api/'; 

  constructor(private http: HttpClient) {}


  addEmployee(data: any){
    return this.http.post(this.apiUrl + '/User/Add-Employee',data);
  }
  getEmployeeByUserId(usersId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}User/${usersId}`);
  }
  getAllEmployee(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + `User/Get_Employee_User?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  updateEmployee(usersId: number, data:any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}User/${usersId}`, data);
  }
  DeleteEmployee(usersId: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}User/${usersId}`;
    return this.http.delete<void>(deleteUrl);
  }
  
}
