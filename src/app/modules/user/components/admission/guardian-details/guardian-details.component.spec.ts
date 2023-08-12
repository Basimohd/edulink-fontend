import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianDetailsComponent } from './guardian-details.component';

describe('GuardianDetailsComponent', () => {
  let component: GuardianDetailsComponent;
  let fixture: ComponentFixture<GuardianDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuardianDetailsComponent]
    });
    fixture = TestBed.createComponent(GuardianDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
