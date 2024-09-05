import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPaymentMetodComponent } from './verify-payment-metod.component';

describe('VerifyPaymentMetodComponent', () => {
  let component: VerifyPaymentMetodComponent;
  let fixture: ComponentFixture<VerifyPaymentMetodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyPaymentMetodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyPaymentMetodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
