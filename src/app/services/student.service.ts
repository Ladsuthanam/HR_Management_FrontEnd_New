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

  GetStudentById(id: string): Observable<any> {
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
  
  AddStudentParents(studentId: number, parentData: any): Observable<any> {
    return this.http.post(`${this.url}Student/Add_Student_Parents?studentId=${studentId}`, parentData);
  }

  GetParentsByStudentId(studentId: string): Observable<any> {
    return this.http.get(`${this.url}Student/Get_Parents_by_StudentId?studentId=${studentId}`);
  }

  AddStudentAddress(studentId: string, addressData: any): Observable<any> {
    return this.http.post(`${this.url}Student/Add_Student_address?studentId=${studentId}`, addressData);
  }
  GetAddressByStudentId(studentId: string): Observable<any> {
    return this.http.get(`${this.url}Student/Get_address_by_StudentID?studentId=${studentId}`);
  }
  AddStudentOlevel(studentId: string, olevelData: any): Observable<any> {
    return this.http.post(`${this.url}Student/Add_Student_Olevel?studentId=${studentId}`, olevelData);
  }
  
  GetOlevelByStudentId(studentId: string): Observable<any> {
    return this.http.get(`${this.url}Student/Get_Olevel_by_StudentId?studentId=${studentId}`);
  }

  AddStudentAlevel(studentId: string, alevelData: any): Observable<any> {
    return this.http.post(`${this.url}Student/Add_Student_Alevel?studentId=${studentId}`, alevelData);
  }

  GetAlevelByStudentId(studentId: string): Observable<any> {
    return this.http.get(`${this.url}Student/Get_Alevel_by_StudentId?studentId=${studentId}`);
  }


  AddStudentHigherStudy(studentId: string, higherStudyData: any): Observable<any> {
    return this.http.post(`${this.url}Student/Add_Student_HigherStudy?studentid=${studentId}`, higherStudyData);
  }

  GetHigherStudyByStudentId(studentId: string): Observable<any> {
    return this.http.get(`${this.url}Student/Get_HigherStudy_by_StudentId?studentId=${studentId}`);
  }

  AddStudentExperience(studentId: string, experienceData: any): Observable<any> {
    return this.http.post(`${this.url}Student/Add_Student_Experiance?studentId=${studentId}`, experienceData);
  }

  GetExperienceByStudentId(studentId: string): Observable<any> {
    return this.http.get(`${this.url}Student/Get_Experiance_By_StudentId?studentId=${studentId}`);
  }
}
