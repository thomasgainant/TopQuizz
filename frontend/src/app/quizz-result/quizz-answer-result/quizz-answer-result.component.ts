import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/data/question';

@Component({
  selector: 'quizz-answer-result',
  templateUrl: './quizz-answer-result.component.html',
  styleUrls: ['./quizz-answer-result.component.css']
})
export class QuizzAnswerResultComponent implements OnInit {

  @Input() answeredQuestion:Question;

  constructor() { }

  ngOnInit(): void {
  }

}
