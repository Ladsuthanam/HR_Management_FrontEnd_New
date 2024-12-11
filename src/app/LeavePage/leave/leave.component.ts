import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-leave',
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,FormsModule,],
  
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css'
})
export class LeaveComponent{
  activeTab: string = 'Personal Details';
  leaveData: any = {
    reason: '',
    leaveType: '',
    leaveDate: '',
    reJoinDate: ''
  };
  userLeaves: any[] = [];

  loggedInUser: any = {
    userId: '12345',
    firstName: 'John Doe'
  };

onTabClick(tab: string) {
  this.activeTab = tab;
 }

 onSubmit() {
  const newLeave = {
    userId: this.loggedInUser.userId,
    firstName: this.loggedInUser.firstName,
    reason: this.leaveData.reason,
    leaveType: this.leaveData.leaveType,
    leaveDate: this.leaveData.leaveDate,
    reJoinDate: this.leaveData.reJoinDate,
    status: 'Pending'
  };
  this.userLeaves.push(newLeave); // Add leave data to the table
    this.leaveData = { reason: '', leaveType: '', leaveDate: '', reJoinDate: '' };
}


  constructor(private fb: FormBuilder, private userservice: UserService, private router: Router){

  }

  // Handle form reset
  onReset() {
    this.leaveData = {
      reason: '',
      leaveType: '',
      leaveDate: '',
      reJoinDate: ''
    };
  }
// Placeholder function for editing leave
editLeave(leave: any) {
  console.log('Edit Leave:', leave);
}

  goToHolly(){
    this.router.navigate([`/hollydaypage`]);

  }

}
