import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaceChartComponent } from './attendace-chart.component';

describe('AttendaceChartComponent', () => {
  let component: AttendaceChartComponent;
  let fixture: ComponentFixture<AttendaceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendaceChartComponent]
    });
    fixture = TestBed.createComponent(AttendaceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
