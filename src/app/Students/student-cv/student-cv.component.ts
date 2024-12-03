import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-cv',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-cv.component.html',
  styleUrls: ['./student-cv.component.css']
})
export class StudentCvComponent implements OnInit {

  student: any;
  parentsForm!: FormGroup;
  addressForm!: FormGroup;
  olQualificationForm!: FormGroup;
  alQualificationForm!:FormGroup;
  higherStudyForm!: FormGroup;
  experienceForm!: FormGroup;


  studentData: any = {};
  isEditingAddress: boolean = false;  

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.initializeForms();
    this.loadStudentData();
  }

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('studentId');
    if (studentId) {
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      this.student = students.find((stu: any) => stu.studentId === studentId);

      if (!this.student) {
        console.error('Student not found with ID:', studentId);
      }
    } else {
      console.error('No studentId found in route parameters.');
    }
  }

  addressFields = [
    { id: 'houseNumber', label: 'House Number', placeholder: 'Enter House Number', error: 'House number is required.' },
    { id: 'street', label: 'Street', placeholder: 'Enter Street', error: 'Street is required.' },
    { id: 'lane', label: 'Lane', placeholder: 'Enter Lane', error: 'Lane is required.' },
    { id: 'city', label: 'City', placeholder: 'Enter City', error: 'City is required.' },
    { id: 'state', label: 'State', placeholder: 'Enter State', error: 'State is required.' },
    { id: 'postalCode', label: 'Postal Code', placeholder: 'Enter Postal Code (5 digits)', error: 'Postal code is required and must be 5 digits.' },
    { id: 'country', label: 'Country', placeholder: 'Enter Country', error: 'Country is required.' },
  ];

  

  initializeForms() {
    this.parentsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      job: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
    });

    this.addressForm = this.fb.group({
      houseNumber: ['', Validators.required],
      street: ['', Validators.required],
      lane: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      country: ['', Validators.required],
    });

    this.olQualificationForm = this.fb.group({
      indexNo: ['', Validators.required],
      year: ['', Validators.required],
      school: ['', Validators.required],
      tamil: ['', Validators.required],
      science: ['', Validators.required],
      maths: ['', Validators.required],
      religion: ['', Validators.required],
      english: ['', Validators.required],
      history: ['', Validators.required],
      basket1: ['', Validators.required],
      basket2: ['', Validators.required],
      basket3: ['', Validators.required]
    });

    this.alQualificationForm = this.fb.group({
      indexNo: ['', Validators.required],
      year: ['', Validators.required],
      school: ['', Validators.required],
      stream: ['', Validators.required],
      subject1: ['', Validators.required],
      subject2: ['', Validators.required],
      subject3: ['', Validators.required],
      generalEnglish: ['', Validators.required],
      generalKnowledge: ['', Validators.required],
      git: ['', Validators.required]
    });
    this.higherStudyForm = this.fb.group({
      stream: ['', Validators.required],
      year: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', Validators.required],
      institute: ['', Validators.required],
      grade: ['', Validators.required]
    });

    this.experienceForm = this.fb.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  
  }
   // Save the parent data to localStorage
   saveData(form: FormGroup, key: string) {
    if (form.valid) {
      this.studentData[key] = form.value;
      localStorage.setItem('studentData', JSON.stringify(this.studentData));
      alert('Data saved successfully!');
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  // Save Address to localStorage
  saveAddress() {
    if (this.addressForm.valid) {
      this.studentData.address = this.addressForm.value;
      localStorage.setItem('studentData', JSON.stringify(this.studentData));
      alert('Address saved successfully!');
      this.isEditingAddress = false; 
      this.addressForm.reset();
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
  saveQualification() {
    if (this.olQualificationForm.valid) {
      const qualificationData = this.olQualificationForm.value;
      this.studentData.olQualification = qualificationData; 
      localStorage.setItem('studentData', JSON.stringify(this.studentData));
      alert('O-Level qualification saved successfully!');
      this.olQualificationForm.reset();
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
  
  saveAlQualification() {
    
    if (this.alQualificationForm.valid) {
      this.studentData.alQualification = this.alQualificationForm.value;
      localStorage.setItem('studentData', JSON.stringify(this.studentData));
      alert('A-Level qualification saved successfully!');
      this.alQualificationForm.reset();
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
  

  editAddress() {
    if (this.studentData.address) {
      this.isEditingAddress = true;
      this.addressForm.patchValue(this.studentData.address);  
    }
  }

  loadStudentData() {
    const data = localStorage.getItem('studentData');
    this.studentData = data ? JSON.parse(data) : {};
  }
}
