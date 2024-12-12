import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private baseUrl = 'http://localhost:5162/api/AccountDetails';

  constructor(private http: HttpClient) { }

 
  getAllAccountDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_acc_details`);
  }
}
