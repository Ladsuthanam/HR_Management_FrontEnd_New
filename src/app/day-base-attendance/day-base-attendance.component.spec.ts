import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayBaseAttendanceComponent } from './day-base-attendance.component';

describe('DayBaseAttendanceComponent', () => {
  let component: DayBaseAttendanceComponent;
  let fixture: ComponentFixture<DayBaseAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayBaseAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayBaseAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
