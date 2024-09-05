import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPurchaseComponent } from './verify-purchase.component';

describe('VerifyPurchaseComponent', () => {
  let component: VerifyPurchaseComponent;
  let fixture: ComponentFixture<VerifyPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyPurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
