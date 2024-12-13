import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingdaysComponent } from './workingdays.component';

describe('WorkingdaysComponent', () => {
  let component: WorkingdaysComponent;
  let fixture: ComponentFixture<WorkingdaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingdaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
