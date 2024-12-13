import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarygenarateComponent } from './salarygenarate.component';

describe('SalarygenarateComponent', () => {
  let component: SalarygenarateComponent;
  let fixture: ComponentFixture<SalarygenarateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalarygenarateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalarygenarateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
