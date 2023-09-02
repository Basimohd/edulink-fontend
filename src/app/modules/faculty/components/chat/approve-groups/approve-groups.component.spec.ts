import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveGroupsComponent } from './approve-groups.component';

describe('ApproveGroupsComponent', () => {
  let component: ApproveGroupsComponent;
  let fixture: ComponentFixture<ApproveGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveGroupsComponent]
    });
    fixture = TestBed.createComponent(ApproveGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
