import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureCvComponent } from './lecturer-cv.component';

describe('LecturerCvComponent', () => {
  let component: LectureCvComponent;
  let fixture: ComponentFixture<LectureCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectureCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
