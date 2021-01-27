import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzOverviewComponent } from './quizz-overview.component';

describe('QuizzOverviewComponent', () => {
  let component: QuizzOverviewComponent;
  let fixture: ComponentFixture<QuizzOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
