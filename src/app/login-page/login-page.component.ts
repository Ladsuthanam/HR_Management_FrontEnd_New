import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Token } from '@angular/compiler';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add this to enable reactive forms
    // other imports
  ],
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  isSignUpMode = false;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private authService: AuthService,
    private toaster: ToastrService
  ) {
    // Form group initialization
    this.form = this.builder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(2)])],
      password: ['', Validators.required]
    });
  }
  token:any;
  decodeToken:any;
  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.form.valid) {
      const loginData = this.form.value;
      
      // Call login API from AuthService
      this.authService.loginSuperAdmin(loginData).subscribe({
        next: (res: any) => {
          this.token = this.authService.getToken()
          console.log(this.token)
            this.decodeToken = this.authService.decodeToken(this.token);
           console.log('Decoded Token:',   this.decodeToken);

          if (this.decodeToken.Role==="SuperAdmin") {
            this.toaster.success('Login Success');
 
          this.router.navigate(['/dashboard']);
         } else if(this.decodeToken.Role==="Admin")  {
           this.toaster.error('Login Failed');
           this.router.navigate(['/dashboard']);
          } else {

          }
        }
      });
    } else {
      // Log the invalid fields
      for (const control in this.form.controls) {
        if (this.form.controls[control].invalid) {
          console.log(`${control} is invalid`);
        }
      }
      //this.toaster.error('Invalid Form', 'Please fill in the required fields');
    }
    if (this.form.valid) {
      const loginData = this.form.value;
      
      // Call login API from AuthService
      this.authService.logInUser(loginData).subscribe({
        next: (res: any) => {
          this.token = this.authService.getToken()
          console.log(this.token)
            this.decodeToken = this.authService.decodeToken(this.token);
           console.log('Decoded Token:',   this.decodeToken);

          if (this.decodeToken.Role==="SuperAdmin") {
            this.toaster.success('Login Success');
 
          this.router.navigate(['/dashboard']);
         } 
        }
      });
    } if (this.form.valid) {
      const loginData = this.form.value;
      
      // Call login API from AuthService
      this.authService.logInUser(loginData).subscribe({
        next: (res: any) => {
          this.token = this.authService.getToken()
          console.log(this.token)
            this.decodeToken = this.authService.decodeToken(this.token);
           console.log('Decoded Token:',   this.decodeToken);

          if (this.decodeToken.Role==="Admin") {
            this.toaster.success('Login Success');
 
          this.router.navigate(['/dashboard']);
           } else {

          }
        },
        error: (err: any) => {
          console.log('Error:', err);  // Log the error
        
         if(err.status==500){
          // this.toaster.error('Invalid Username or Password');
        }
        }
      });
    } else {
      // Log the invalid fields
      for (const control in this.form.controls) {
        if (this.form.controls[control].invalid) {
          console.log(`${control} is invalid`);
        }
      }
      this.toaster.error('Invalid Form', 'Please fill in the required fields');
    }

  }
  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control?.touched && control?.invalid ? true : false;
  }
  toggleSignUp() {
    this.router.navigateByUrl('/register');
  }

  toggleSignIn() {
   
  }
}
