import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-leave',
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css'
})
export class LeaveComponent {

  title = 'Bytes';
  activeTab: string = 'Personal Details';

onTabClick(tab: string) {
  this.activeTab = tab;
 }

  leaveDetails = {
    name: '',
    role: '',
    applyDate: '',
    reason: '',
    leaveDate: '',
    rejoinDate: ''
  };

  leaveRecords: any[] = [];

  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router){

  }

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

  goToHolly(){
    this.router.navigate([`/hollydaypage`]);

  }

  saveHollyDay(){
    
  }
}
