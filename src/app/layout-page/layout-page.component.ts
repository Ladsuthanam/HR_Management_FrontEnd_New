import { Component,  AfterViewInit, OnInit ,HostListener} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
  imports: [FormsModule,CommonModule,RouterOutlet,RouterLink,IonicModule, MatButtonModule,
    MatIconModule,],
})
export class LayoutPageComponent implements OnInit, AfterViewInit{
  private sidebar!: HTMLElement;
  private toggleButton!: HTMLElement;

  isDropdownOpen = false;
  decodedToken: any;
  userRole: any;
  token: any;
  imageUrl: string | undefined;

  constructor(private router:Router, private authService:AuthService){

  }


   ngOnInit(): void {
    // Initialization logic that doesn't depend on the DOM
    this.token = this.authService.getToken()
    console.log(this.token)
      this.decodedToken = this.authService.decodeToken(this.token);
     console.log('Decoded Token:',   this.decodedToken);
     this.userRole = this.decodedToken.Role;  
     this.imageUrl = this.decodedToken.imageUrl;  
   
    if (!this.imageUrl) {
      this.imageUrl = 'assets/images/default-image.png'; // Path to a default image
    }
   
  
  }
  navigateToAccount(): void {
    this.router.navigate(['/account']);
  }

  ngAfterViewInit(): void {
    // Safely access DOM elements after the view is initialized
    this.sidebar = document.querySelector('#sidebar') as HTMLElement;
    this.toggleButton = document.querySelector('#sidebar-toggle') as HTMLElement;

    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', this.showSidebar.bind(this));
    } 
  }
  showSidebar(): void {
    if (this.sidebar.classList.contains('show')) {
      this.sidebar.classList.remove('show');
      this.toggleButton.classList.remove('position-fixed');
    } else {
      this.sidebar.classList.add('show');
      this.toggleButton.classList.add('position-fixed');
    }
  }
  toggleDropdown(event: MouseEvent): void {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen; 
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;

    // Close dropdown if the click is outside
    if (!target.closest('.dropdown-usrn')) {
      this.isDropdownOpen = false;
    }
  }
  logoutsPro(): void {
    this.router.navigate(['/login']);
  }
  gotoBack(){

    this.router.navigateByUrl('/login')
  }
  
  
}
  


