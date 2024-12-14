import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  standalone: true,  
  imports: [CommonModule, FormsModule,ReactiveFormsModule], 
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
   form!:FormGroup;
  isSignUpMode = false;
  loginAdmin: any = {
  //   userName: '',
  //  password: '',
  };
  

  constructor(private router: Router,private builder: FormBuilder,private authservice : AuthService ,private toaster: ToastrService){
  
  this.form = this.builder.group({
    username:['',Validators.compose([Validators.required, Validators.minLength(2)])],
    password:['',Validators.required]
  });
}
  toggleSignUp() {
    // this.isSignUpMode = true;
    this.router.navigateByUrl('/regirer');
  }

  toggleSignIn() {
    //this.isSignUpMode = false;
   }

   onSubmit() {
    if (this.form.valid) {
      const loginData = this.form.value;
  
      // Call login API from AuthService
      this.authservice.loginSuperAdmin(loginData).subscribe({
        next: (res: any) => {
          if (res.isAuthenticated) {
            this.toaster.success('Login Successful');
            this.router.navigate(['/dashboard']); // Navigate to dashboard
          } else {
            this.toaster.error('Login Failed', 'Invalid username or password');
          }
        },
        error: (err:any) => {
          console.log('Error:', err);
          this.toaster.error('Login Failed', 'Something went wrong');
        }
      });
    } else {
      this.toaster.error('Invalid Form', 'Please fill in the required fields');
    }
  }
  

   hasDisplayableError(controlName:string) : Boolean{
    const control =this.form.get(controlName);
    return Boolean(control?.invalid) &&
    (this.isSignUpMode || Boolean(control?.touched) || Boolean(control?.dirty))
   }
 
  // onLogin() {
  //   if (this.loginAdmin.userName === 'admin' && this.loginAdmin.password === 'admin0') {
  //     this.router.navigateByUrl('/dashboard'); 
  //   } else {
  //     alert("Please enter correct username or password"); 
  //   }
  // }
}
