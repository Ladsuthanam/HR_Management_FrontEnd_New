import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ApiUrl = environment.apiUrl + '/api/SuperAdmin';
  userApi = environment.apiUrl +'/api/userLogIn'; 

  constructor(private http: HttpClient) { }

  // Create a new Super Admin
  createSuperAdmin(formData: any) {
    return this.http.post(`${this.ApiUrl}/Add_Super_Admin`, formData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
logInUser(data:{email:string;  password: string}){
  return this.http.post<any>(`${this.userApi}/LogIn_User`, data,{
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }).pipe(
    tap((res: any) => {
      // console.log('Response from login:', res);

      if (!res.token) {
        console.error('Login failed: No token received');
        return;
      }

      // Decode and store token
      const decodedToken = this.decodeToken(res.token);
      if (decodedToken) {
        localStorage.setItem('authToken', res.token);
        this.storeUserData(decodedToken);
      } else {
        console.error('Failed to decode token');
      }
    }),
    catchError((error) => {
      console.error('Login error:', error);
      return throwError(() => error);
    })
  )
}
  // Super Admin login
  loginSuperAdmin(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.ApiUrl}/LogIn_Sup_Admin`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      tap((res: any) => {
        // console.log('Response from login:', res);

        if (!res.token) {
          console.error('Login failed: No token received');
          return;
        }

        // Decode and store token
        const decodedToken = this.decodeToken(res.token);
        if (decodedToken) {
          localStorage.setItem('authToken', res.token);
          this.storeUserData(decodedToken);
        } else {
          console.error('Failed to decode token');
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  // Store decoded token data
  private storeUserData(decodedToken: any) {
    if (decodedToken?.user_id) {
      localStorage.setItem('userId', decodedToken.user_id);
    }
  }

 
  decodeToken(token: string): any {
    try {
      const decoded = jwtDecode(token);
      // console.log(decoded)
      // alert("work")
      return decoded;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

 
  getToken() {
    return localStorage.getItem('authToken');
  }


  getUserId() {
    return localStorage.getItem('userId');
  }

  // Log out user
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }

  // Check authentication status
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

