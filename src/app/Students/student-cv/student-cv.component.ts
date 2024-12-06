import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-cv',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student-cv.component.html',
  styleUrls: ['./student-cv.component.css']
})
export class StudentCvComponent implements OnInit {

  student: any;
  studentId: number = 0;
  parentsForm!: FormGroup;
  addressForm!: FormGroup;
  olQualificationForm!: FormGroup;
  alQualificationForm!: FormGroup;
  higherStudyForm!: FormGroup;
  experienceForm!: FormGroup;

  studentData: any = {};
  isEditingAddress: boolean = false;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = (params.get('id'));
      console.log('Fetched ID:', id);
  
      if (id) {
        this.getStudent(id);
      } else {
        console.error('Invalid or missing ID');
      }
    });
  }
  
  

  getStudent(id: string): void {
    this.studentService.GetStudentById(id).subscribe(
      (response) => {
        this.student = response; // Assign the response to the student object
        console.log('Student Data:', this.student); // Log for debugging
      },
      (error) => {
        console.error('Error fetching student data:', error); // Handle errors
      }
    );
  }

 

  // Define field data for forms (unchanged)
  addressFields = [
    { id: 'houseNumber', label: 'House Number', placeholder: 'Enter House Number', error: 'House number is required.' },
    { id: 'street', label: 'Street', placeholder: 'Enter Street', error: 'Street is required.' },
    { id: 'lane', label: 'Lane', placeholder: 'Enter Lane', error: 'Lane is required.' },
    { id: 'city', label: 'City', placeholder: 'Enter City', error: 'City is required.' },
    { id: 'state', label: 'State', placeholder: 'Enter State', error: 'State is required.' },
    { id: 'postalCode', label: 'Postal Code', placeholder: 'Enter Postal Code (5 digits)', error: 'Postal code is required and must be 5 digits.' },
    { id: 'country', label: 'Country', placeholder: 'Enter Country', error: 'Country is required.' },
  ];

  higherStudyFields = [
    { id: 'stream', label: 'Stream', placeholder: 'Enter Stream', error: 'Stream is required.' },
    { id: 'year', label: 'Year', placeholder: 'Enter Year', error: 'Year is required.' },
    { id: 'duration', label: 'Duration', placeholder: 'Enter Duration', error: 'Duration is required.' },
    { id: 'description', label: 'Description', placeholder: 'Enter Description', error: 'Description is required.' },
    { id: 'institute', label: 'Institute', placeholder: 'Enter Institute', error: 'Institute is required.' },
    { id: 'grade', label: 'Grade', placeholder: 'Enter Grade', error: 'Grade is required.' },
  ];

  experienceFields = [
    { id: 'position', label: 'Position', placeholder: 'Enter Position', error: 'Position is required.' },
    { id: 'company', label: 'Company', placeholder: 'Enter Company', error: 'Company is required.' },
    { id: 'startDate', label: 'Start Date', placeholder: 'Enter Start Date', error: 'Start date is required.' },
    { id: 'endDate', label: 'End Date', placeholder: 'Enter End Date', error: 'End date is required.' },
    { id: 'description', label: 'Description', placeholder: 'Enter Description', error: 'Description is required.' },
  ];

  // Initialize all the forms
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

  // Save all data to the database
  saveData(form: FormGroup, key: string) {
    if (form.valid) {
      const data = form.value;
      // this.studentService.saveStudentData(key, data).subscribe(
      //   (response) => {
      //     alert('Data saved successfully!');
      //   },
      //   (error) => {
      //     alert('There was an error saving the data.');
      //     console.error(error);
      //   }
      // );
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  // Save Address to the database
  saveAddress() {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;
    //   this.studentService.saveStudentData('address', addressData).subscribe(
    //     (response) => {
    //       alert('Address saved successfully!');
    //       this.isEditingAddress = false;
    //       this.addressForm.reset();
    //     },
    //     (error) => {
    //       alert('There was an error saving the address.');
    //       console.error(error);
    //     }
    //   );
    // } else {
    //   alert('Please fill all required fields correctly.');
    // }
  }

  // Save O-Level qualification to the database
  // saveQualification() {
  //   if (this.olQualificationForm.valid) {
  //   //   const qualificationData = this.olQualificationForm.value;
  //   //   this.studentService.saveStudentData('olQualification', qualificationData).subscribe(
  //   //     (response) => {
  //   //       alert('O-Level qualification saved successfully!');
  //   //       this.olQualificationForm.reset();
  //   //     },
  //   //     (error) => {
  //   //       alert('There was an error saving the qualification.');
  //   //       console.error(error);
  //   //     }
  //   //   );
  //   // } else {
  //   //   alert('Please fill all required fields correctly.');
  //   // }
  // }

  // Save A-Level qualification to the database
  // saveAlQualification() {
  //   if (this.alQualificationForm.valid) {
  //     const qualificationData = this.alQualificationForm.value;
  //     this.studentService.saveStudentData('alQualification', qualificationData).subscribe(
  //       (response) => {
  //         alert('A-Level qualification saved successfully!');
  //         this.alQualificationForm.reset();
  //       },
  //       (error) => {
  //         alert('There was an error saving the qualification.');
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     alert('Please fill all required fields correctly.');
  //   }
  // }

  // // Save Experience to the database
  // saveExperience() {
  //   if (this.experienceForm.valid) {
  //     const experienceData = this.experienceForm.value;
  //     this.studentService.saveStudentData('experience', experienceData).subscribe(
  //       (response) => {
  //         alert('Experience saved successfully!');
  //         this.experienceForm.reset();
  //       },
  //       (error) => {
  //         alert('There was an error saving the experience.');
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     alert('Please fill all required fields correctly.');
  //   }
  // }

  // // Save Higher Study details to the database
  // saveHigherStudy() {
  //   if (this.higherStudyForm.valid) {
  //     const studyData = this.higherStudyForm.value;
  //     this.studentService.saveStudentData('higherStudy', studyData).subscribe(
  //       (response) => {
  //         alert('Higher study details saved successfully!');
  //         this.higherStudyForm.reset();
  //       },
  //       (error) => {
  //         alert('There was an error saving the study details.');
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     alert('Please fill all required fields correctly.');
  //   }
  // }
}
}
