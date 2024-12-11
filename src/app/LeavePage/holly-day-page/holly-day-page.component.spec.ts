import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HollyDayPageComponent } from './holly-day-page.component';

describe('HollyDayPageComponent', () => {
  let component: HollyDayPageComponent;
  let fixture: ComponentFixture<HollyDayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HollyDayPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HollyDayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
