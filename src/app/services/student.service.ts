import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url ='http://localhost:5162/api/';

  constructor(private http: HttpClient) { }

  AddStudent(data: any){
    return this.http.post(this.url + 'Student/AddStudent', data);
  }
  

  GetStudentById(Id: number) {
    return this.http.get(this.url + `Student/Get_Student_by_Id?Id=${Id}`);
  }

  GetAllStudent(pageNumber: number, pageSize: number) {
    return this.http.get(this.url + `Student/Get_All_Students?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  UpdateStudent(studentId: number, data: any) {
    return this.http.put(this.url + `Student/UpdateStudent/${studentId}`, data);
  }
  
  DeleteStudent(studentId: number) {
    return this.http.delete(this.url + `Student/DeleteStudent/${studentId}`);
  }
  

}
