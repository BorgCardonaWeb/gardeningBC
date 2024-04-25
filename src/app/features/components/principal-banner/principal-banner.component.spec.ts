import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalBannerComponent } from './principal-banner.component';

describe('PrincipalBannerComponent', () => {
  let component: PrincipalBannerComponent;
  let fixture: ComponentFixture<PrincipalBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipalBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
