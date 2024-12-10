import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../../services/student.service';
import { flush } from '@angular/core/testing';

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
  parents: any[] = [];
  parentsForm!: FormGroup; 
  address : any[] = [];
  addressForm!: FormGroup;
  olevels: any[]= [];
  olevelsForm!: FormGroup;
  alevels: any[]= [];
  alevelsForm!: FormGroup;
  higherstudy: any[] = [];
  higherstudyForm!: FormGroup;
  experiance: any[] = [];
  experianceForm!: FormGroup;
  

 
  studentData: any = {};
  parentsData: any = {};
  addressData: any = {};
  olevelData: any = {};
  alevelData: any = {};
  higherStudyData: any = {};
  experianceData: any = {};

  isParentAdded: boolean = false;
  isAddressAdded: boolean = false;
  isOlevelAdded: boolean = false;
  isAlevelAdded: boolean = false;
  isHigherStudyAdded: boolean = false;
  isExperianceAdded: boolean = false;


 

  parentsFields = [
    { controlName: 'firstName', label: 'First Name', placeholder: 'Enter First Name' },
    { controlName: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name' },
    { controlName: 'job', label: 'Job', placeholder: 'Enter Job' },
    { controlName: 'contactNo', label: 'Contact Number', placeholder: 'Enter Contact Number'},
    { controlName: 'address', label: 'Address', placeholder: 'Enter Address' }
    ];

  addressFields = [
    { controlName: 'houseNumber', label: 'House Number', placeholder: 'Enter House Number' },
    { controlName: 'street', label: 'Street', placeholder: 'Enter Street' },
    { controlName: 'lane', label: 'Lane', placeholder: 'Enter Lane' },
    { controlName: 'city', label: 'City', placeholder: 'Enter City'},
    { controlName: 'state', label: 'State', placeholder: 'Enter State' },
    { controlName: 'postalCode', label: 'Postal Code', placeholder: 'Enter Postal Code' },
    { controlName: 'country', label: 'Country', placeholder: 'Enter Country' }

    ];
    
    olevelsFields =[
      { controlName: 'indexNo', label: 'Index No', placeholder: 'Enter Index No' },
      { controlName: 'year', label: 'Year', placeholder: 'Enter Year' },
      { controlName: 'school', label: 'School', placeholder: 'Enter School' },
      { controlName: 'tamil', label: 'Tamil', placeholder: 'Enter Tamil'},
      { controlName: 'science', label: 'Science', placeholder: 'Enter Science' },
      { controlName: 'maths', label: 'Maths', placeholder: 'Enter Maths' },
      { controlName: 'religion', label: 'Religion', placeholder: 'Enter Religion' },
      { controlName: 'english', label: 'English', placeholder: 'Enter English' },
      { controlName: 'history', label: 'History', placeholder: 'Enter History'},
      { controlName: 'basket1', label: 'Basket1', placeholder: 'Enter Basket1' },
      { controlName: 'basket2', label: 'Basket2', placeholder: 'Enter Basket2' },
      { controlName: 'basket3', label: 'Basket3', placeholder: 'Enter Basket3' }
  
    ];
    alevelFields =[
      { controlName: 'indexNo', label: 'Index No', placeholder: 'Enter Index No' },
      { controlName: 'year', label: 'Year', placeholder: 'Enter Year' },
      { controlName: 'school', label: 'School', placeholder: 'Enter School' },
      { controlName: 'stream', label: 'Stream', placeholder: 'Enter Stream'},
      { controlName: 'subject1', label: 'Subject1', placeholder: 'Enter Subject1' },
      { controlName: 'subject2', label: 'Subject2', placeholder: 'Enter Subject2' },
      { controlName: 'subject3', label: 'Subject3', placeholder: 'Enter Subject3' },
      { controlName: 'generalEnglish', label: 'General English', placeholder: 'Enter General English' },
      { controlName: 'generalKnowledge', label: 'General Knowledge', placeholder: 'Enter General Knowledge'},
      { controlName: 'git', label: 'GIT', placeholder: 'Enter GIT' }
    
    ];
    higherStudiesFields =[
      { controlName: 'type', label: 'Type', placeholder: 'Enter Type' },    
      { controlName: 'stream', label: 'Stream', placeholder: 'Enter Stream'},
      { controlName: 'year', label: 'Year', placeholder: 'Enter Year' },
      { controlName: 'duration', label: 'Duration', placeholder: 'Enter Duration' },
      { controlName: 'description', label: 'Description', placeholder: 'Enter Description' },
      { controlName: 'institute', label: 'Institude', placeholder: 'Enter Institute' },
      { controlName: 'grade', label: 'Grade', placeholder: 'Enter Grade' }
     
    ];
    experianceFields =[
      { controlName: 'companyName', label: 'Company Name', placeholder: 'Enter Company Name' },    
      { controlName: 'position', label: 'Position', placeholder: 'Enter Position'},
      { controlName: 'startDate', label: 'StartDate', placeholder: 'Enter Start Date' },
      { controlName: 'endDate', label: 'End Date', placeholder: 'Enter End Date' },
      { controlName: 'description', label: 'Description', placeholder: 'Enter Description' }
     
     
    ];
    constructor(private fb: FormBuilder, private studentService: StudentService, private route: ActivatedRoute,private http: HttpClient) {
      this.parentsForm = this.fb.group({
        firstName:[''],
        lastName:[''],
        job:[''],
        contactNo:[''],
        address:['']
      });

      this.addressForm = this.fb.group({
        houseNumber:[''],
        street:[''],
        lane:[''],
        state:[''],
        postalCode:[''],
        country:['']
      });

      this.olevelsForm = this.fb.group({
        indexNo:[''],
        year:[''],
        school:[''],
        tamil:[''],
        science:[''],
        maths:[''],
        religion:[''],
        english:[''],
        history:[''],
        basket1:[''],
        basket2:[''],
        basket3:['']
      });

      this.alevelsForm = this.fb.group({
        indexNo:[''],
        year:[''],
        school:[''],
        stream:[''],
        subject1:[''],
        subject2:[''],
        subject3:[''],
        generalEnglish:[''],
        generalKnowledge:[''],
        git:['']
      });

      this.higherstudyForm = this.fb.group({
        type:[''],
        stream:[''],
        year:[''],
        duration:[''],
        institute:[''],
        grade:[''],
      });

      this.experianceForm = this.fb.group({
        companyName:[''],
        position:[''],
        startDate:[''],
        endDate:[''],
        description:['']
      })
    }



    ngOnInit(): void {
      
      this.route.paramMap.subscribe((params) => {
          const id = params.get('id');
          console.log('Fetched ID:', id);
  
          if (id) {
              this.getStudent(id);
              this.getParentsByStudentId(id); 
          } else {
              console.error('Invalid or missing ID');
          }
      });
  }
    
  getStudent(id: string): void {
    this.studentService.GetStudentById(id).subscribe(
      (response) => {
        this.student = response; 
        console.log('Student Data:', this.student); 
      },
      (error) => {
        console.error('Error fetching student data:', error); 
      }
    );
  }

  getParentsByStudentId(studentId: string): void {
    this.studentService.GetParentsByStudentId(studentId).subscribe(
        (response) => {
            this.student.parents = response; 
            console.log('Parent Data:', this.student.parents);
        },
        (error) => {
            console.error('Error fetching parent data:', error);
        }
    );
  }

  getAddressByStudentId(studentId: string):void {

  }

  getOlevelByStudentId(studentId: string):void {

  }

  getAlevelByStudentId(studentId: string): void{

  }

  getHigherStudyByStudentId(studentId: string): void {

  }

  getExperianceByStudentId(studentId: string): void {
    
  }
   openModal(): void {
      this.isParentAdded = true;
      this.isAddressAdded = true;
      this.isOlevelAdded = true;
      this.isAlevelAdded = true;
      this.isHigherStudyAdded = true;
      this.isExperianceAdded = true;
    }
    cancel(): void {
      this.parentsForm.reset();
      this.closeModal();
    }
    closeModal(): void {
      this.isParentAdded = false;
      this.isAddressAdded = false;
      this.isOlevelAdded = false;
      this.isAlevelAdded = false;
      this.isHigherStudyAdded = false;
      this.isExperianceAdded = false;
    }

    onSubmitParent(): void {
      if (this.parentsForm.valid) {
        const parentData = this.parentsForm.value;
        this.studentService.  AddStudentParents(this.studentId, parentData).subscribe(
          (response) => {
            console.log('Parent added successfully:', response);
            this.getParentsByStudentId(this.studentId.toString()); // Reload parent details after adding
            this.closeModal();
          },
          (error) => {
            console.error('Error adding parent:', error);
            alert('An error occurred while adding parent details.');
          }
        );
      } else {
        this.parentsForm.markAllAsTouched();
      }
    }

    isInvalid(controlName: string): any {
      const control = this.parentsForm.get(controlName);
      return control?.invalid && control?.touched;
    }

   

  // Initialize all the forms
  initializeForms(): void {

  
  }

  // Save parent data
  saveParentDetails(): void {
    if (this.parentsForm.valid) {
      const parentData = this.parentsForm.value;
      this.student.parents = parentData; 
      this.isParentAdded = true; 
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  
  editParentDetails(): void {
    this.isParentAdded = false; 
    this.parentsForm.patchValue(this.student.parents);
  }

  
  }
  

