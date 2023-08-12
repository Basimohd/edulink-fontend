import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousEducationComponent } from './previous-education.component';

describe('PreviousEducationComponent', () => {
  let component: PreviousEducationComponent;
  let fixture: ComponentFixture<PreviousEducationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviousEducationComponent]
    });
    fixture = TestBed.createComponent(PreviousEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
