import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Chart,registerables } from 'chart.js';
import { AuthService } from '../services/auth.service';
Chart.register(...registerables)
@Component({
  selector: 'app-dashboard-page',
  imports: [FormsModule,CommonModule,RouterOutlet],
  templateUrl:'./dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  private sidebar!: HTMLElement;
  private toggleButton!: HTMLElement;

  isDropdownOpen = false;
  
  currentDate: Date = new Date();
  displayedMonth: number = this.currentDate.getMonth();
  displayedYear: number = this.currentDate.getFullYear();
  calendarDays: number[][] = [];
  currentTime: string = '';
  currentMonthName: string = '';
  events: { date: string, title: string, description: string }[] = [];  
  decodedToken: any;
  userRole: any;
  token: any;

  constructor(private authService:AuthService) {
    
  }

  public  config: any = {
    type: 'bar',
    data: {
      
        labels: ['JAN', 'FEB', 'MAR', 'APRIL' ],
        datasets: [
          {
        
        label: 'Count',
        data: ['467', '576', '572', '588'],
        backgroundColor: 'black',
          },
          {
        label: 'Total',
        data: ['100', '120', '133', '134'],
        backgroundColor: 'white',
        
          },
        
        ],
    },
    options: {
      aspectRatio: 4,
    },
        
  };
  
    
  chart: any;



  ngOnInit(): void {
    this.sidebar = document.querySelector('#sidebar') as HTMLElement;
    this.toggleButton = document.querySelector('#sidebar-toggle') as HTMLElement;

    this.toggleButton.addEventListener('click', this.showSidebar.bind(this));

    this.chart = new Chart('MyChart', this.config);

    this.updateCalendar();
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.token = this.authService.getToken()
    console.log(this.token)
      this.decodedToken = this.authService.decodeToken(this.token);
     console.log('Decoded Token:',   this.decodedToken);
     this.userRole = this.decodedToken.Role;

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
  
  showAddEventForm(): void {
    const formElement = document.getElementById('addEventForm');
    if (formElement) formElement.style.display = 'block';
  }

  saveEvent(): void {
    const title = (document.getElementById('eventTitle') as HTMLInputElement).value;
    const description = (document.getElementById('eventDescription') as HTMLTextAreaElement).value;
    const eventDate = (document.getElementById('eventDate') as HTMLInputElement).value;

    if (title && description && eventDate) {
      this.events.push({ title, description, date: eventDate });
      this.updateCalendar();
      this.cancelEvent();
    }
  }

  cancelEvent(): void {
    const formElement = document.getElementById('addEventForm');
    if (formElement) formElement.style.display = 'none';
  }

  // Update the current time in HH:mm:ss format
  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  // Update the calendar for the current month
  updateCalendar(): void {
    this.generateCalendar(this.displayedMonth, this.displayedYear);
    this.currentMonthName = this.getMonthName(this.displayedMonth);
  }

  // Generate the days for the calendar
  generateCalendar(month: number, year: number): void {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendar: number[][] = [];

    let currentDay = 1;
    let week: number[] = new Array(7).fill(0);

    // Fill the first week with empty days
    for (let i = firstDay; i < 7; i++) {
      week[i] = currentDay++;
    }
    calendar.push(week);

    // Fill the rest of the weeks
    while (currentDay <= daysInMonth) {
      week = new Array(7).fill(0);
      for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
        week[i] = currentDay++;
      }
      calendar.push(week);
    }

    this.calendarDays = calendar;
  }

  // Get the month name
  getMonthName(month: number): string {
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month];
  }

  // Navigate to the previous month
  prevMonth(): void {
    if (this.displayedMonth === 0) {
      this.displayedMonth = 11;
      this.displayedYear--;
    } else {
      this.displayedMonth--;
    }
    this.updateCalendar();
  }

  // Navigate to the next month
  nextMonth(): void {
    if (this.displayedMonth === 11) {
      this.displayedMonth = 0;
      this.displayedYear++;
    } else {
      this.displayedMonth++;
    }
    this.updateCalendar();
  }

  // Handle clicking on a day (optional, you can display more info or select the day)
  onDayClick(day: number): void {
    if (day) {
      alert(`You clicked on day: ${day}`);
    }
  }
}
