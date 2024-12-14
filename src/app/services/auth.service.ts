import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  ApiUrl = 'http://localhost:5162/api/Auth';

  createSuperAdmin(formData : any){

   return this.http.post(this.ApiUrl + '/SuperAdminRegister', formData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })   
  }

  loginSuperAdmin(data: { username: string; password: string }) {
    return this.http.post<{ isAuthenticated: boolean }>('/SuperAdminLogin', data);
  }
   
}
