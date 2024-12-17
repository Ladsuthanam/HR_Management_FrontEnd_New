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
  activeTab: string = 'Account Details';
  leaveData: any = {
    leaveType: '',
    countPerYear: '',
  };
  userLeaves: any[] = [];
  leaveTypes: any[] = [];

  loggedInUser: any = {
    userId: '12345',
    firstName: 'John Doe'
  };

onTabClick(tab: string) {
  this.activeTab = tab;
 }
 onSubmit() {
  const newLeaveType = {
    leaveType: this.leaveData.leaveType,
    countPerYear: this.leaveData.countPerYear,
  };
  this.leaveTypes.push(newLeaveType);
  this.leaveData = { leaveType: '', countPerYear: '' };
}


  constructor(private fb: FormBuilder, private userservice: UserService, private router: Router){

  }

  // Handle form reset
  onReset() {
    this.leaveData = {
      leaveType: '',
      countPerYear: '',
    };
  }
// Placeholder function for editing leave
editLeave(leave: any) {
  console.log('Edit Leave:', leave);
}

  goToHolly(){
    this.router.navigate([`/hollydaypage`]);

  }

  addLeaveType() {
    console.log('Add Leave Type button clicked');
    // Add navigation logic or open modal here
  }
  
  applyLeave() {
    console.log('Apply Leave button clicked');
    // Open leave form or navigate to leave page
  }
  
  viewLeaveResponse() {
    console.log('Leave Response button clicked');
    // Navigate or display leave response information
  }

  deleteLeaveType(index: number) {
    this.leaveTypes.splice(index, 1);
  }
  

}
