import { Component,  AfterViewInit, OnInit ,HostListener} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


interface Notification {
  id: number;
  message: string;
  isRead: boolean;
}



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
  
  notifications: Notification[] = [
    { id: 1, message: 'New leave request submitted', isRead: false },
    { id: 2, message: 'Meeting scheduled for tomorrow', isRead: false },
    { id: 3, message: 'Update your profile information', isRead: false }
  ];

  newNotificationCount: number = this.notifications.filter(n => !n.isRead).length;
  isNotificationModalOpen: boolean = false;

  constructor(private router:Router){

  }

  toggleNotificationModal(): void {
    this.isNotificationModalOpen = !this.isNotificationModalOpen;
    this.markNotificationsAsRead();
  }

  closeNotificationModal(): void {
    this.isNotificationModalOpen = false;
  }

  markNotificationsAsRead(): void {
    this.notifications.forEach(notification => (notification.isRead = true));
    this.updateNotificationCount();
  }

  updateNotificationCount(): void {
    this.newNotificationCount = this.notifications.filter(n => !n.isRead).length;
  }

  replyToNotification(notificationId: number): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      alert(`Replying to: "${notification.message}"`);
    }
  }

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

  gotoBack(){

    this.router.navigateByUrl('/login')
  }
  
}
  


