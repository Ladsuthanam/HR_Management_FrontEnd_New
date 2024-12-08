import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';  // Make sure this is correct
import { Chart, registerables } from 'chart.js';

// Register all components of Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-attendance-page',
  standalone: true,
  imports: [CommonModule, NgChartsModule, MatButtonModule],  // Ensure NgChartsModule is in imports array
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.css']
})
export class AttendancePageComponent {
  chartData = [
    { data: [10, 20, 30, 40], label: 'Daily Attendance' },
    { data: [300, 500, 700, 800], label: 'Monthly Attendance' }
  ];

  chartLabels = ['Students', 'Staff', 'Employees', 'Lecturers'];
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
