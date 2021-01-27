import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesResultsListComponent } from './quizzes-results-list.component';

describe('QuizzesResultsListComponent', () => {
  let component: QuizzesResultsListComponent;
  let fixture: ComponentFixture<QuizzesResultsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzesResultsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
