import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url = 'http://localhost:5162/api/';

  constructor(private http: HttpClient) { }

  AddStudent(data: any) {
    return this.http.post(this.url + 'Student/AddStudent', data);
  }

  GetStudentById(studentId: string) {
    return this.http.get(`${this.url}Student/${studentId}`);
  }

  // Corrected method signature by adding the return type
  GetAllStudents(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.url + `Student/Get_All_Students?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  UpdateStudent(studentId: number, data: any) {
    return this.http.put(this.url + `Student/UpdateStudent/${studentId}`, data);
  }

  DeleteStudent(studentId: number) {
    return this.http.delete(this.url + `Student/DeleteStudent/${studentId}`);
  }

}
