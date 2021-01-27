import { Component, Input, OnInit } from '@angular/core';
import { Quizz } from 'src/data/quizz';
import { DataService } from '../data.service';

@Component({
  selector: 'quizzes-list',
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.css']
})
export class QuizzesListComponent implements OnInit {

  @Input() quizzes:Quizz[];

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.quizzes = this.dataService.quizzes;
  }

}
