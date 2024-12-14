import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private baseUrl = 'http://localhost:5162/api/AccountDetails';
  private workingDaysUrl = 'http://localhost:5162/api/WorkingDays'; 
  private apiUrl = 'http://localhost:5162/api/Salary'; 

  constructor(private http: HttpClient) { }

  // Existing methods for account details
  getAllAccountDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_acc_details`);
  }

  addAccount(userId: string, accountData: any): Observable<any> {
    const url = `${this.baseUrl}/Add_Account?UserId=${userId}`;
    return this.http.post<any>(url, accountData);
  }

  updateAccount(userId: string, accountData: any): Observable<any> {
    const url = `${this.baseUrl}/Update_Accound?UserId=${userId}`;
    return this.http.put<any>(url, accountData);
  }

  deleteAccountDetails(accountId: string): Observable<any> {
    const url = `${this.baseUrl}/Delete_AccountDetails`;
    const params = new HttpParams().set('id', accountId);
    return this.http.delete<any>(url, { params });
  }

  addWorkingDays(userId: string, payload: any): Observable<any> {
    return this.http.post(`${this.workingDaysUrl}/Add_workingDays?UserId=${userId}`,payload );
  }

  getAllWorkingDays(): Observable<any> {
    return this.http.get(`${this.workingDaysUrl}/Get_All_workingDays`);
  }

  updateWorkingDays(userId: string, payload: any): Observable<any> {
    return this.http.put<any>(`${this.workingDaysUrl}/Update_wokingDays?userId=${userId}`, payload);
  }
  

  getAllSalaries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/All_Salaries`);
  }

  addSalary(userId: string, salaryRequest: any): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/Add_Salary?UserId=${userId}`, salaryRequest);
  }

  updateSalary(userId: string, salaryRequest: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Update_salary?userId=${userId}`, salaryRequest);
  }

  getSalaryByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Get_salary_By_UserId?UserId=${userId}`);
  }
}




