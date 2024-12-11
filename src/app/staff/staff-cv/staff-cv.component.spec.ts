import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCvComponent } from './staff-cv.component';

describe('StaffCvComponent', () => {
  let component: StaffCvComponent;
  let fixture: ComponentFixture<StaffCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
