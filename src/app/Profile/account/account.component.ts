import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  name: string = '';
  address: string = '';
  selectedFile: File | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetails();
    this.name = userDetails.name;
    this.address = userDetails.address;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files?.[0]) {
      this.selectedFile = fileInput.files[0];
    }
  }

  saveDetails(): void {
    this.authService.updateUserProfile({
      name: this.name,
      address: this.address,
      profilePicture: this.selectedFile
    });
    this.router.navigate(['/layout']);
  }

}
