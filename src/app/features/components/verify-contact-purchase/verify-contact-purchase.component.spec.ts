import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyContactPurchaseComponent } from './verify-contact-purchase.component';

describe('VerifyContactPurchaseComponent', () => {
  let component: VerifyContactPurchaseComponent;
  let fixture: ComponentFixture<VerifyContactPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyContactPurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyContactPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
