import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

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
    // On initialization, check if the user is already authenticated
    if (this.authService.isAuthenticated()) {

       this.token = this.authService.getToken()
     console.log(this.token)
       this.decodeToken = this.authService.decodeToken(this.token);
      console.log('Decoded Token:',   this.decodeToken);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const loginData = this.form.value;
      
      // Call login API from AuthService
      this.authService.loginSuperAdmin(loginData).subscribe({
        next: (res: any) => {
          console.log('Response:', res);  // Log response for debugging
          if (res && this.decodeToken.isAuthenticated) {
           // this.toaster.success('Login Successful');
            this.router.navigate(['/adminPage/dashboard']);
          } else {
           // this.toaster.error('Login Failed', 'Invalid username or password');
          }
        },
        error: (err: any) => {
          console.log('Error:', err);  // Log the error
         // this.toaster.error('Login Failed', 'Something went wrong');
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
