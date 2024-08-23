import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerProductsComponent } from './banner-products.component';

describe('BannerProductsComponent', () => {
  let component: BannerProductsComponent;
  let fixture: ComponentFixture<BannerProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
