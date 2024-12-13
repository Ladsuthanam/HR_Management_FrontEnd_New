import { Component } from '@angular/core';
import { FormGroup,FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../material.model';
import { Router, RouterModule} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule,MaterialModule,RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  regForm!:FormGroup

  constructor(private builder: FormBuilder ,private snackBar: MatSnackBar,
    private router:Router
  ) {

  this.regForm = this.builder.group({
      name: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      email: this.builder.control('', [Validators.required, Validators.email]),
      image: this.builder.control(''),
      password: this.builder.control('',  [Validators.required, Validators.minLength(6)]),
      confirmpassword: this.builder.control('', Validators.required)
    });
  
  }

  onSubmit() {
    if (this.regForm.invalid) {
      this.snackBar.open('Please fill all fields correctly!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    } else {
      // Proceed with form submission logic
      console.log('Form Submitted:', this.regForm.value);
    }
  }

  toggleSignIn(){ 
    this.router.navigate([`/login`]) 
  }

}
