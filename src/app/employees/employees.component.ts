import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
}


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterOutlet, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  notifications: Notification[] = [
    { id: 1, message: 'New leave request submitted', isRead: false },
    { id: 2, message: 'Meeting scheduled for tomorrow', isRead: false },
    { id: 3, message: 'Update your profile information', isRead: false }
  ];

  newNotificationCount: number = this.notifications.filter(n => !n.isRead).length;
  isNotificationModalOpen: boolean = false;

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
   
  }
}

