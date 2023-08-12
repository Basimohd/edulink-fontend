import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeInvoiceComponent } from './fee-invoice.component';

describe('FeeInvoiceComponent', () => {
  let component: FeeInvoiceComponent;
  let fixture: ComponentFixture<FeeInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeInvoiceComponent]
    });
    fixture = TestBed.createComponent(FeeInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
