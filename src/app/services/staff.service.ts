import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  saveStudentData(arg0: string, experienceData: any) {
    throw new Error('Method not implemented.');
  }

  url = 'http://localhost:5162/api/';

  constructor(private http: HttpClient) { }

  AddStaff(data: any) {
    return this.http.post(this.url + 'User/Add-Staff', data);
  }

  GetStaffById(id: string): Observable<any> {
    return this.http.get(`${this.url}User/${id}`);
  }


  GetAllStaffs(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.url + `User/Get_All_Students?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }


  UpdateStaff(usersId: number, data: any): Observable<void> {
    return this.http.put<void>(`${this.url}User/${usersId}`, data);
  }
  
  DeleteStaff(usersId: number): Observable<void> {
    const deleteUrl = `${this.url}User/${usersId}`;
    return this.http.delete<void>(deleteUrl);
  }
}
