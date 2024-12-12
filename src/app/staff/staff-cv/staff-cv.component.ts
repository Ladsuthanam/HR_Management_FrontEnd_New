import { CommonModule, DatePipe } from '@angular/common';
import { CSP_NONCE, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { flush } from '@angular/core/testing';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-staff-cv',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './staff-cv.component.html',
  styleUrl: './staff-cv.component.css',
  providers: [DatePipe]
})
export class StaffCvComponent implements OnInit{
  staff: any;
  stffId: number = 0;

  address: any[] = [];
  addressForm!: FormGroup;
  olevels: any[] = [];
  olevelsForm!: FormGroup;
  aLevels: any[] = [];
  alevelsForm!: FormGroup;
  hStudeies: any[] = [];
  higherstudyForm!: FormGroup;
  experiance: any[] = [];
  experianceForm!: FormGroup;

  staffData: any = {};
  addressData: any = {};
  olevelData: any = {};
  alevelData: any = {};
  higherStudyData: any = {};
  experianceData: any = {};

  isAddressAdded: boolean = false;
  isOlevelAdded: boolean = false;
  isAlevelAdded: boolean = false;
  isHigherStudyAdded: boolean = false;
  isExperianceAdded: boolean = false;

  addressFields = [
    { controlName: 'houseNumber', label: 'House Number', placeholder: 'Enter House Number' },
    { controlName: 'street', label: 'Street', placeholder: 'Enter Street' },
    { controlName: 'city', label: 'City', placeholder: 'Enter City' },
    { controlName: 'state', label: 'State', placeholder: 'Enter State' },
    { controlName: 'postalCode', label: 'Postal Code', placeholder: 'Enter Postal Code' },
    { controlName: 'country', label: 'Country', placeholder: 'Enter Country' }

  ];


  olevelsFields = [
    { controlName: 'indexNo', label: 'Index No', placeholder: 'Enter Index No' },
    { controlName: 'year', label: 'Year', placeholder: 'Enter Year' },
    { controlName: 'school', label: 'School', placeholder: 'Enter School' },
    { controlName: 'tamil', label: 'Tamil', placeholder: 'Enter Tamil' },
    { controlName: 'science', label: 'Science', placeholder: 'Enter Science' },
    { controlName: 'maths', label: 'Maths', placeholder: 'Enter Maths' },
    { controlName: 'religion', label: 'Religion', placeholder: 'Enter Religion' },
    { controlName: 'english', label: 'English', placeholder: 'Enter English' },
    { controlName: 'history', label: 'History', placeholder: 'Enter History' },
    { controlName: 'basket1', label: 'Basket1', placeholder: 'Enter Basket1' },
    { controlName: 'basket2', label: 'Basket2', placeholder: 'Enter Basket2' },
    { controlName: 'basket3', label: 'Basket3', placeholder: 'Enter Basket3' }

  ];
  alevelFields = [
    { controlName: 'indexNo', label: 'Index No', placeholder: 'Enter Index No' },
    { controlName: 'year', label: 'Year', placeholder: 'Enter Year' },
    { controlName: 'school', label: 'School', placeholder: 'Enter School' },
    { controlName: 'stream', label: 'Stream', placeholder: 'Enter Stream' },
    { controlName: 'subject1', label: 'Subject1', placeholder: 'Enter Subject1' },
    { controlName: 'subject2', label: 'Subject2', placeholder: 'Enter Subject2' },
    { controlName: 'subject3', label: 'Subject3', placeholder: 'Enter Subject3' },
    { controlName: 'generalEnglish', label: 'General English', placeholder: 'Enter General English' },
    { controlName: 'generalKnowledge', label: 'General Knowledge', placeholder: 'Enter General Knowledge' },
    { controlName: 'git', label: 'GIT', placeholder: 'Enter GIT' }

  ];
  higherStudiesFields = [
    { controlName: 'type', label: 'Type', placeholder: 'Enter Type' },
    { controlName: 'stream', label: 'Stream', placeholder: 'Enter Stream' },
    { controlName: 'year', label: 'Year', placeholder: 'Enter Year' },
    { controlName: 'duration', label: 'Duration', placeholder: 'Enter Duration' },
    { controlName: 'description', label: 'Description', placeholder: 'Enter Description' },
    { controlName: 'institute', label: 'Institude', placeholder: 'Enter Institute' },
    { controlName: 'grade', label: 'Grade', placeholder: 'Enter Grade' }

  ];

  experianceFields = [
    { controlName: 'companyName', label: 'Company Name', placeholder: 'Enter Company Name' },
    { controlName: 'position', label: 'Position', placeholder: 'Enter Position' },
    { controlName: 'startDate', label: 'StartDate', placeholder: 'Enter Start Date' },
    { controlName: 'endDate', label: 'End Date', placeholder: 'Enter End Date' },
    { controlName: 'description', label: 'Description', placeholder: 'Enter Description' }


  ];
  constructor(private fb: FormBuilder, private usertService: UserService, private route: ActivatedRoute, private http: HttpClient) {

    this.addressForm = this.fb.group({
      houseNumber: [''],
      street: [''],
      state: [''],
      postalCode: [''],
      city: [''],
      country: ['']
    });

    this.olevelsForm = this.fb.group({
      indexNo: [''],
      year: [''],
      school: [''],
      tamil: [''],
      science: [''],
      maths: [''],
      religion: [''],
      english: [''],
      history: [''],
      basket1: [''],
      basket2: [''],
      basket3: ['']
    });

    this.alevelsForm = this.fb.group({
      indexNo: [''],
      year: [''],
      school: [''],
      stream: [''],
      subject1: [''],
      subject2: [''],
      subject3: [''],
      generalEnglish: [''],
      generalKnowledge: [''],
      git: ['']
    });

    this.higherstudyForm = this.fb.group({
      type: [''],
      stream: [''],
      year: [''],
      duration: [''],
      institute: [''],
      grade: [''],
    });

    this.experianceForm = this.fb.group({
      companyName: [''],
      position: [''],
      startDate: [''],
      endDate: [''],
      description: ['']
    })
  }
  ngOnInit(): void {
      
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('Fetched ID:', id);

      if (id) {
          this.getStaff(id);
         this. getStaffAddress(id);
         this.getStaffOlevel(id);
         this. getStaffAlevels(id);
         this. getStaffHigherStudy(id);
         this.getStaffExperiance(id);
          
      } else {
          console.error('Invalid or missing ID');
      }
  });
    
  }

  
  getStaff(id: string):void{
    this.usertService.getUserById(id).subscribe(
      (responce) =>{
        this.staff = responce;
        console.log('Employee Data:', this.staff);
      }, 
      (error) =>{
        console.error('Error fetching employee data:', error);
      }
    )
  }

  getStaffAddress(userId: string): void{
    this.usertService.getUserAddress(userId).subscribe(
      (responce) =>{
        this.address = responce;
        console.log('Address Data:', this.address);
      },
      (error) =>{
        console.error('Error fetching Address Data:', error)
      }
    )
  }

  getStaffOlevel(userId:string): void{
    this.usertService.getUserOlevel(userId).subscribe(
      (responce) =>{
        this.olevels = responce;
        console.log('Olevel Date:', this.olevels);
      },
      (error) =>{
        console.error('Error fetching OlevelData:', error);
      }
    )
  }

  getStaffAlevels(userId: string): void {
    this.usertService.getUserAlevel(userId).subscribe(
      (responce) =>{
        this.aLevels = responce;
        console.log('ALevel data:', this.aLevels);
      },
      (error) =>{
        console.error('Error fetching Alevels:', error);
      }
    )
  }

  getStaffHigherStudy(userId: string): void {
    this.usertService.getUserHigherStudies(userId).subscribe(
      (responce) =>{
        this.hStudeies = responce;
        console.log('Higher Study Date:', this.hStudeies);
      },
      (error) =>{
        console.error('Error fetching HigherStudy:', error);
      }
    )
  }

  getStaffExperiance(userId: string): void{
    this.usertService.getUserExperience(userId).subscribe(
      (responce) =>{
        this.experiance = responce;
        console.log('Experiance Data:', this.experiance);
      },
      (error) =>{
        console.error('Error fetching experiance:', error);
      }
      )
    
  }


  openModal(modalType: string) {
   if (modalType === 'address') {
      this.isAddressAdded = true;
    }else if(modalType === 'olevel'){
      this.isOlevelAdded = true;
    }
    else if(modalType === 'alevel'){
      this.isAlevelAdded = true;
    }else if(modalType === 'higherStudy'){
      this.isHigherStudyAdded = true;
    }
    else if(modalType === 'experiance'){
      this.isExperianceAdded = true;
    }
  }
  cancel(): void {
  this.addressForm.reset();
  this.olevelsForm.reset();
  this.alevelsForm.reset();
  this.higherstudyForm.reset();
  this.experianceForm.reset();
    this.closeModal();
  }

  closeModal(): void {
    this.isAddressAdded = false;
    this.isOlevelAdded = false;
    this.isAlevelAdded = false;
    this.isHigherStudyAdded = false;
    this.isExperianceAdded = false;
  }

  onSubmitAddress(): void {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;
      const staffId = this.staff.id; 
      console.log('Payload:', { staffId, addressData });
  
      this.usertService. addUserAddress(staffId, addressData).subscribe(
        (response) => {
          console.log('address added successfully:', response);
          this.getStaffAddress(staffId);
          this.closeModal();
        
        },
        (error) => {
          console.error('Error adding address:', error);
          alert(`An error occurred: ${error.message}`);
        }
      );
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  onSubmitOlevel(): void{
    if(this.olevelsForm.valid){
      const olevelData = this.olevelsForm.value;
      const staffId = this.staff.id;
      console.log('playload:',{staffId, olevelData});

      this.usertService.addUserOlevel(staffId, olevelData).subscribe(
        (responce) =>{
          console.log('Olevel added successfully:', responce);
          this.getStaffOlevel(staffId);
          this.closeModal();
        },
        (error) =>{
          console.error('Error adding olevels:', error);
          alert(`An error occurred: ${error.message}`);
        }
      )
    }
    else {
      this.olevelsForm.markAllAsTouched();
    }
  }

  onSubmitAlevels():void{
    if(this.alevelsForm.valid){
      const alevelData = this.alevelsForm.value;
      const staffId = this.staff.id;
      console.log('palyload:',{staffId, alevelData});

      this.usertService.addUserAlevel(staffId, alevelData).subscribe(
        (responce) =>{
          console.log('Alevel added successfully:', responce);
          this. getStaffAlevels(staffId);
          this.closeModal();
        },
        (error) =>{
          console.error('Error adding Alevels:', error);
          alert(`An error occurred:${error.message}`);
        }
      )
    }
    else {
      this.alevelsForm.markAllAsTouched();
    }
  }

  onSubmitHigherStudy(): void{
    if(this.higherstudyForm.valid){
      const higherStudyData = this.higherstudyForm.value;
      const staffId = this.staff.id;
      console.log('playload:',{staffId, higherStudyData});

      this.usertService.addUserHigherStudies(staffId, higherStudyData).subscribe(
        (respoce) =>{
          console.log('Higher Study added Successfully:', respoce);
          this.getStaffHigherStudy(staffId);
          this.closeModal();
        },
        (error) =>{
          console.error('Errror adding HigherStudy:', error);
          alert(`An error occured: ${error.message}`);
        }
      );
    }
    else {
      this.higherstudyForm.markAllAsTouched();
    }
  }

  onSubmitExperiance(): void{
    if(this.experianceForm.valid){
      const experianceData = this.experianceForm.value;
      const staffId = this.staff.id;

      this.usertService.addUserExperience(staffId, experianceData).subscribe(
        (responce) =>{
          console.log('Experiance added successfullt:', responce);
          this.getStaffExperiance(staffId);
          this.closeModal();
        },
        (error) =>{
          console.error('Error adding Experiance:', error);
          alert(`An error occured: ${error.message}`);
        }
      )
    }
    else {
      this.experianceForm.markAllAsTouched();
    }
  }


  deleteAddress(addressId: string): void {
    this.usertService.deleteUserAddress(addressId).subscribe(
      () => {
        this.staff.address = this.staff.address.filter((address: any) => address.id !== addressId);
        console.log('Address deleted successfully');
      },
      (error) => {
        console.error('Error deleting address:', error);
      }
    );
  }

  deleteOlevel(olevelId: string): void {
    this.usertService.deleteUserOlevel(olevelId).subscribe(
      () => {
        this.staff.olevels = this.staff.olevels.filter((olevel: any) => olevel.id !== olevelId);
        console.log('O-level deleted successfully');
      },
      (error) => {
        console.error('Error deleting O-level:', error);
      }
    );
  }

  deleteAlevel(alevelId: string): void {
    this.usertService.  deleteUserAlevel(alevelId).subscribe(
      () => {
        this.staff.alevels = this.staff.alevels.filter((alevel: any) => alevel.id !== alevelId);
        console.log('A-level deleted successfully');
      },
      (error) => {
        console.error('Error deleting A-level:', error);
      }
    );
  }

  deleteHigherStudy(higherStudyId: string): void {
    this.usertService.deleteUserHigherStudies(higherStudyId).subscribe(
      () => {
        this.staff.higherstudy = this.staff.higherstudy.filter((study: any) => study.id !== higherStudyId);
        console.log('Higher Study deleted successfully');
      },
      (error) => {
        console.error('Error deleting Higher Study:', error);
      }
    );
  }

  deleteExperience(experienceId: string): void {
    this.usertService.deleteUserExperience(experienceId).subscribe(
      () => {
        this.staff.experiance = this.staff.experiance.filter((exp: any) => exp.id !== experienceId);
        console.log('Experience deleted successfully');
      },
      (error) => {
        console.error('Error deleting experience:', error);
      }
    );
  }


  isInvalid(controlName: string): any {
    const control = this.addressForm.get(controlName);
    return control?.invalid && control?.touched;
  }
  initializeForms(): void {
  }

}
