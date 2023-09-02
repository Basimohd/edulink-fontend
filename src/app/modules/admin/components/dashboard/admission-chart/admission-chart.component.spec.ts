import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionChartComponent } from './admission-chart.component';

describe('AdmissionChartComponent', () => {
  let component: AdmissionChartComponent;
  let fixture: ComponentFixture<AdmissionChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmissionChartComponent]
    });
    fixture = TestBed.createComponent(AdmissionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
