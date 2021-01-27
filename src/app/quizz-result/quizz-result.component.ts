import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quizz } from 'src/data/quizz';
import { DataService } from '../data.service';

@Component({
  selector: 'quizz-result',
  templateUrl: './quizz-result.component.html',
  styleUrls: ['./quizz-result.component.css']
})
export class QuizzResultComponent implements OnInit {

  finishedQuizz:Quizz;

  constructor(private dataService:DataService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.finishedQuizz = this.dataService.getQuizzResult(this.route.snapshot.paramMap.get('id'));
    
  }

}
