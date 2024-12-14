import { Component } from '@angular/core';
import { FormGroup,FormBuilder,ReactiveFormsModule, Validators,ValidatorFn, AbstractControl,ValidationErrors } from '@angular/forms';
import { MaterialModule } from '../material.model';
import { Router, RouterModule} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, ReactiveFormsModule,MaterialModule,RouterModule,MaterialModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  regForm!:FormGroup
  isSubmited : boolean = false;
  constructor(private builder: FormBuilder, private toaster: ToastrService, private router: Router,private authserice :AuthService) {
    // Form group with custom password match validator
    this.regForm = this.builder.group(
      {
        name: this.builder.control('', [Validators.required, Validators.minLength(5)]),
        email: this.builder.control('', [Validators.required, Validators.email]),
        image: this.builder.control(''),
        password: this.builder.control('', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/(?=.*[^a-zA-Z0-9])/)
        ]),
        confirmpassword: this.builder.control('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator } // Set validator for the whole form group
    );
  }

  // Password match validator function
  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmpassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
  

  onSubmit() {
    this.isSubmited = true;
  
    if (this.regForm.valid) {
      const formData = {
        name: this.regForm.value.name,
        Email: this.regForm.value.email,
        Image: this.regForm.value.image || null,
        Password: this.regForm.value.password
      };
  
      this.authserice.createSuperAdmin(formData).subscribe({
        next: (res: any) => {
          if (res.succeeded) {
            this.toaster.success('New Super Admin Added');
            setTimeout(() => {
              this.regForm.reset();
              this.isSubmited = false;
              this.router.navigate(['/login']); // Navigate to login
            }, 1000);
          } else {
            // this.toaster.error('Registration Failed', 'This username or email may already exist');
            this.isSubmited = false;
          }
        },
        error: (err) => {
          console.log('Error:', err);
          // this.toaster.error('Registration Failed', 'Something went wrong');
          this.isSubmited = false;
        }
      });
    } else {
      // this.toaster.error('Invalid Form', 'Please check all required fields');
      this.isSubmited = false;
    }
  }  

  toggleSignIn() {
    this.router.navigate([`/login`]);
  }
}
