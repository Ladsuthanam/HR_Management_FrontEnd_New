import { Component,  AfterViewInit, OnInit ,HostListener} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
  imports: [FormsModule,CommonModule,RouterOutlet,RouterLink],
})
export class LayoutPageComponent implements OnInit, AfterViewInit{
  private sidebar!: HTMLElement;
  private toggleButton!: HTMLElement;

  isDropdownOpen = false;
  
 

  // ngOnInit(): void {
  //   this.sidebar = document.querySelector('#sidebar') as HTMLElement;
  //   this.toggleButton = document.querySelector('#sidebar-toggle') as HTMLElement;

  //   this.toggleButton.addEventListener('click', this.showSidebar.bind(this));
    
  // }
ngOnInit(): void {
    // Initialization logic that doesn't depend on the DOM
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
    event.preventDefault(); // Prevent default anchor behavior
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown state
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;

    // Close dropdown if the click is outside
    if (!target.closest('.dropdown-usrn')) {
      this.isDropdownOpen = false;
    }
  }
  
}
  


