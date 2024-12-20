import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCvComponent } from './student-cv.component';

describe('StudentCvComponent', () => {
  let component: StudentCvComponent;
  let fixture: ComponentFixture<StudentCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
