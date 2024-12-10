import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  studentParent :any[] = [];
  filteredParents: any[] = [];
  addressForm!: FormGroup;
  olQualificationForm!: FormGroup;
  alQualificationForm!: FormGroup;
  higherStudyForm!: FormGroup;
  experienceForm!: FormGroup;

  studentData: any = {};
  isAddressAdded: boolean = false;
  isParentAdded: boolean = false;
  isModalOpen: boolean = false;

  constructor(private fb: FormBuilder, private studentService: StudentService, private route: ActivatedRoute) {
    this.parentsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      job: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
    });
  }

  parentsFields = [
    { controlName: 'firstName', label: 'First Name', placeholder: 'Enter First Name' },
    { controlName: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name' },
    { controlName: 'job', label: 'Job', placeholder: 'Enter Job' },
    { controlName: 'contactNo', label: 'Contact Number', placeholder: 'Enter Contact Number'},
    { controlName: 'address', label: 'Address', placeholder: 'Enter Address' }
    ];

  // addressFields = [
  //   { id: 'houseNumber', label: 'House Number', placeholder: 'Enter house number', error: 'House number is required' },
  //   { id: 'street', label: 'Street', placeholder: 'Enter street name', error: 'Street is required' },
  //   { id: 'lane', label: 'Lane', placeholder: 'Enter lane', error: 'Lane is required' },
  //   { id: 'city', label: 'City', placeholder: 'Enter city name', error: 'City is required' },
  //   { id: 'state', label: 'State', placeholder: 'Enter state', error: 'State is required' },
  //   { id: 'postalCode', label: 'Postal Code', placeholder: 'Enter postal code', error: 'Postal code is required' },
  //   { id: 'country', label: 'Country', placeholder: 'Enter country', error: 'Country is required' }
  // ];
  // higherStudyFields = [
  //   { id: 'stream', label: 'Stream', placeholder: 'Enter Stream', error: 'Stream is required.' },
  //   { id: 'year', label: 'Year', placeholder: 'Enter Year', error: 'Year is required.' },
  //   { id: 'duration', label: 'Duration', placeholder: 'Enter Duration', error: 'Duration is required.' },
  //   { id: 'description', label: 'Description', placeholder: 'Enter Description', error: 'Description is required.' },
  //   { id: 'institute', label: 'Institute', placeholder: 'Enter Institute', error: 'Institute is required.' },
  //   { id: 'grade', label: 'Grade', placeholder: 'Enter Grade', error: 'Grade is required.' },
  // ];

  // experienceFields = [
  //   { id: 'position', label: 'Position', placeholder: 'Enter Position', error: 'Position is required.' },
  //   { id: 'company', label: 'Company', placeholder: 'Enter Company', error: 'Company is required.' },
  //   { id: 'startDate', label: 'Start Date', placeholder: 'Enter Start Date', error: 'Start date is required.' },
  //   { id: 'endDate', label: 'End Date', placeholder: 'Enter End Date', error: 'End date is required.' },
  //   { id: 'description', label: 'Description', placeholder: 'Enter Description', error: 'Description is required.' },
  // ];


  ngOnInit(): void {
   this.route.paramMap.subscribe((params)=>{
    const id = (params.get('id'));
    console.log('fetched Id:', id);
    if(id){
      this.getStudent(id);

    }
    else{
      console.error('invalid or missing up');
    }
   })
    this.getStudentParent();

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

   openModal(): void {
      this.isModalOpen = true;
    }
    cancel(): void {
      this.parentsForm.reset();
      this.closeModal();
    }
    closeModal(): void {
      this.isModalOpen = false;
    }

    onSubmitParent() :void{
      if (this.parentsForm.valid) {
        const formData = { ...this.parentsForm.value };
        formData.isDeleted = false; 
        console.log('Sending studentParant data:', formData);
  
        this.studentService.AddStudentParent(this.studentId,formData).subscribe(
          (response) => {
            console.log('StudentParent added successfully', response);
            this.getStudentParent();
            this.closeModal();
          },
          (error) => {
            console.error('Error adding studentparent:', error);
            if (error.status === 400) {
              alert('Validation error: ' + JSON.stringify(error.error));
            } else {
              alert('An unexpected error occurred');
            }
          }
        );
      } else {
        console.log('Form is invalid:', this.parentsForm.errors);
        this.parentsForm.markAllAsTouched();
      }    
    }

    isInvalid(controlName: string): any {
      const control = this.parentsForm.get(controlName);
      return control?.invalid && control?.touched;
    }

    getStudentParent(){
      this.studentService.GetParentsByStudentId(this.studentId).subscribe(
        (response: any) => {
          if (Array.isArray(response) && response.length > 0) {
            this.studentParent = response;
            this. filteredParents = [...this.studentParent];
          } else {
            console.error('No studentparent found or unexpected response:', response);
            this.studentParent = [];
            this. filteredParents = [];
          }
        },
        (error) => {
          console.error('Error fetching students:', error);
          alert('An error occurred while fetching studentparent.');
        }
      );
    }

  // Initialize all the forms
  initializeForms(): void {

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

  saveAlQualification() : void{
    if(this.addressForm.valid){
      const addressData = this.addressForm.value;
      this.student.address = addressData;
      this. isAddressAdded = true
    }else{
       alert('Please Add All requied fiels!');
    }

  }
  editParentDetails(): void {
    this.isParentAdded = false; 
    this.parentsForm.patchValue(this.student.parents);
  }

  saveData(form: FormGroup, key: string) {
    if (form.valid) {
      const data = form.value;
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  saveAddress() {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;  
  }
 }

//  saveQualification(){
//   if(this.olQualificationForm.valid){
//     var Oldata = this.olQualificationForm.valid;
//   }
//  }
}
