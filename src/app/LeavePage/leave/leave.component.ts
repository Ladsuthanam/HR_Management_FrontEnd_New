import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { UserService } from '../../services/user.service';
import { LeaveService } from '../../services/leave.service';
@Component({
  selector: 'app-leave',
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,FormsModule,],
  
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css'
})
export class LeaveComponent implements OnInit{
  activeTab: string = 'Add Leave';
  leaveData: any = { name: '', countPerYear: '' };
  leaveTypes: any[] = []; 
  leaveRequests: any[] = [];

// onTabClick(tab: string) {
//   this.activeTab = tab;
//  }
//  onSubmit() {
//   const newLeaveType = {
//     name: this.leaveData.name,
//     countPerYear: this.leaveData.countPerYear,
//   };
//   this.leaveTypes.push(newLeaveType);
//   this.leaveData = { name: '', countPerYear: '' };
// }


  constructor(private fb: FormBuilder, private userservice: UserService,
     private router: Router, private leaveService: LeaveService){

  }
  ngOnInit(): void {
    this.loadLeaveTypes();
  }
  loadLeaveTypes() {
    this.leaveService.getAllLeaveTypes().subscribe(
      (data) => {
        this.leaveTypes = data;
        console.log('Leave Types loaded:', data);
      },
      (error) => {
        console.error('Error loading leave types:', error);
      }
    );
  }
  loadLeaveRequests(): void {
    this.leaveService.getAllLeaveRequests().subscribe(
      (data) => {
        this.leaveRequests = data;
        console.log('Leave Requests loaded:', data);
      },
      (error) => {
        console.error('Error loading leave requests:', error);
      }
    );
  }

  onSubmit() {
    if (!this.leaveData.name || !this.leaveData.countPerYear) {
      alert('Please fill in all fields.');
      return;
    }

    this.leaveService.addLeaveType(this.leaveData).subscribe(
      (response) => {
        console.log('Leave Type Added:', response);
        this.loadLeaveTypes(); // Refresh table
        this.leaveData = { name: '', countPerYear: '' }; // Reset form
      },
      (error) => {
        console.error('Error adding leave type:', error);
      }
    );
  }
  // // Handle form reset
  // onReset() {
  //   this.leaveData = {
  //     name: '',
  //     countPerYear: '',
  //   };
  // }
// Placeholder function for editing leave
// editLeave(leave: any) {
//   console.log('Edit Leave:', leave);
// }

  goToHolly(){
    this.router.navigate([`/hollydaypage`]);

  }

 
  
  
  
  
  deleteLeaveType(id: string) {
    if (confirm('Are you sure you want to delete this leave type?')) {
      this.leaveService.deleteLeaveType(id).subscribe(
        () => {
          console.log('Leave Type Deleted');
          this.loadLeaveTypes(); // Refresh table
        },
        (error) => {
          console.error('Error deleting leave type:', error);
        }
      );
    }
  }
  
  onTabClick(tab: string): void {
    this.activeTab = tab;
    if (tab === 'Account Details') {
      
      this.loadLeaveRequests();
    }
  }
}
