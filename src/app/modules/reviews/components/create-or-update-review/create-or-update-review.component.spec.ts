import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateReviewComponent } from './create-or-update-review.component';

describe('CreateOrUpdateReviewComponent', () => {
  let component: CreateOrUpdateReviewComponent;
  let fixture: ComponentFixture<CreateOrUpdateReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
