import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-leave',
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css'
})
export class LeaveComponent {

  leaveDetails = {
    name: '',
    role: '',
    applyDate: '',
    reason: '',
    leaveDate: '',
    rejoinDate: ''
  };

  leaveRecords: any[] = [];

  saveLeaveDetails() {
    this.leaveRecords.push({ ...this.leaveDetails });
    this.clearForm();
  }

  clearForm() {
    this.leaveDetails = {
      name: '',
      role: '',
      applyDate: '',
      reason: '',
      leaveDate: '',
      rejoinDate: ''
    };
  }

  saveHollyDay(){
    
  }
}
