import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantInfoComponent } from './applicant-info.component';

describe('ApplicantInfoComponent', () => {
  let component: ApplicantInfoComponent;
  let fixture: ComponentFixture<ApplicantInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantInfoComponent]
    });
    fixture = TestBed.createComponent(ApplicantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
