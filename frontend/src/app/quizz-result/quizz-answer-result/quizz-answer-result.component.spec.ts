import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzAnswerResultComponent } from './quizz-answer-result.component';

describe('QuizzAnswerResultComponent', () => {
  let component: QuizzAnswerResultComponent;
  let fixture: ComponentFixture<QuizzAnswerResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzAnswerResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzAnswerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
