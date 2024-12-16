import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userProfile = {
    name: 'John Doe',
    address: '123 Main St',
    profileImage: 'https://th.bing.com/th?id=OIP.jryuUgIHWL-1FVD2ww8oWgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
  };

  getUserProfileImage(): string {
    return this.userProfile.profileImage;
  }
  getUserDetails(): any {
    return this.userProfile;
  }

  updateUserProfile(details: any): void {
    this.userProfile = { ...this.userProfile, ...details };
  }
  logoutsPro(): void {
    console.log('User logged out');
  }

  ApiUrl = environment.apiUrl + 'SuperAdmin';
  userApi = environment.apiUrl +'userLogIn'; 

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
 
   


