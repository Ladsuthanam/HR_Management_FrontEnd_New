import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-login-page',
  standalone: true,  
  imports: [CommonModule, FormsModule], 
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  isSignUpMode = false;
  loginAdmin: any = {
    userName: '',
    password: '',
  };
  

  constructor(private router: Router) {}

  toggleSignUp() {
    this.isSignUpMode = true;
  }

  toggleSignIn() {
    this.isSignUpMode = false;
  }

 
  onLogin() {
    if (this.loginAdmin.userName === 'admin' && this.loginAdmin.password === 'admin0') {
      this.router.navigateByUrl('/dashboard'); 
    } else {
      alert("Please enter correct username or password"); 
    }
  }
}
