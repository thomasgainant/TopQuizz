import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quizz } from 'src/data/quizz';

@Component({
  selector: 'quizz-overview',
  templateUrl: './quizz-overview.component.html',
  styleUrls: ['./quizz-overview.component.css']
})
export class QuizzOverviewComponent implements OnInit {

  @Input() quizz:Quizz;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  launchQuizz():void{
    this.router.navigateByUrl('/quizz/'+this.quizz.id);
  }
}
