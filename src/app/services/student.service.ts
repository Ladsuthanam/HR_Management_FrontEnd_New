import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  saveStudentData(arg0: string, experienceData: any) {
    throw new Error('Method not implemented.');
  }

  url = 'http://localhost:5162/api/';

  constructor(private http: HttpClient) { }

  AddStudent(data: any) {
    return this.http.post(this.url + 'Student/AddStudent', data);
  }

  GetStudentById(id: number): Observable<any> {
    return this.http.get(`${this.url}Student/${id}`);
  }


  GetAllStudents(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.url + `Student/Get_All_Students?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }


  UpdateStudent(studentId: number, data: any): Observable<void> {
    return this.http.put<void>(`${this.url}Student/${studentId}`, data);
  }
  
  DeleteStudent(studentId: number): Observable<void> {
    const deleteUrl = `${this.url}Student/${studentId}`;
    return this.http.delete<void>(deleteUrl);
  }
  
}
