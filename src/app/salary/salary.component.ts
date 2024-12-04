import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface User {
  userId: string;
  userName: string;
  role: string;
  basicSalary: number;
  deduction: number;
  bonus: number;
  epf: number;
  etf: number;
  allowances: number;
  workingDays: number;
  status: string;
}

@Component({
  selector: 'app-salary',
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css'
})
export class SalaryComponent {

  users: User[] = [];
  newUser: User = this.initializeUser();

  initializeUser(): User {
    return {
      userId: '',
      userName: '',
      role: 'Employee',
      basicSalary: 0,
      deduction: 0,
      bonus: 0,
      epf: 0,
      etf: 0,
      allowances: 0,
      workingDays: 0,
      status: 'Pending'
    };
  }

  saveUser() {
    this.users.push({ ...this.newUser });
    this.newUser = this.initializeUser();
  }

  calculateNetSalary(user: User): number {
    return (
      user.basicSalary -
      user.deduction +
      user.bonus +
      user.allowances -
      user.epf -
      user.etf
    );
  }
}
