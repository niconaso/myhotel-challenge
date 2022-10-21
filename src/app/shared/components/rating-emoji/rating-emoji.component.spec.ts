import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingEmojiComponent } from './rating-emoji.component';

describe('RatingEmojiComponent', () => {
  let component: RatingEmojiComponent;
  let fixture: ComponentFixture<RatingEmojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingEmojiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
