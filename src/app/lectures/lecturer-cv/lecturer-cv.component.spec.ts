import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerCvComponent } from './lecturer-cv.component';

describe('LecturerCvComponent', () => {
  let component: LecturerCvComponent;
  let fixture: ComponentFixture<LecturerCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
