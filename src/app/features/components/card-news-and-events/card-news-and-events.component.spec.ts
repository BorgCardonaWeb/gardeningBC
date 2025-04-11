import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNewsAndEventsComponent } from './card-news-and-events.component';

describe('CardNewsAndEventsComponent', () => {
  let component: CardNewsAndEventsComponent;
  let fixture: ComponentFixture<CardNewsAndEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNewsAndEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardNewsAndEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
