import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-cv',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './student-cv.component.html',
  styleUrl: './student-cv.component.css'
})
export class StudentCvComponent implements OnInit {
  
  student: any;

  constructor(private route: ActivatedRoute) {}

  
  ngOnInit(): void {
    
    const studentId = this.route.snapshot.paramMap.get('studentId');
    if (studentId) {
      // Fetch student data from local storage
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      this.student = students.find((stu: any) => stu.studentId === studentId);

      if (!this.student) {
        console.error('Student not found with ID:', studentId);
      }
    } else {
      console.error('No studentId found in route parameters.');
    }
  }
}
