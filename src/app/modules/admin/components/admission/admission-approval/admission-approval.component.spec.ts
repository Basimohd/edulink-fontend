import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionApprovalComponent } from './admission-approval.component';

describe('AdmissionApprovalComponent', () => {
  let component: AdmissionApprovalComponent;
  let fixture: ComponentFixture<AdmissionApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmissionApprovalComponent]
    });
    fixture = TestBed.createComponent(AdmissionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
