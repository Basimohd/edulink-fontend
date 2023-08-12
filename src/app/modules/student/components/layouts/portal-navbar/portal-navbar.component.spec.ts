import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalNavbarComponent } from './portal-navbar.component';

describe('PortalNavbarComponent', () => {
  let component: PortalNavbarComponent;
  let fixture: ComponentFixture<PortalNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortalNavbarComponent]
    });
    fixture = TestBed.createComponent(PortalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
