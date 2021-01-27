import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quizz } from 'src/data/quizz';
import { DataService } from '../data.service';

@Component({
  selector: 'quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  quizz:Quizz;
  step:number = 0;

  constructor(private dataService:DataService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.quizz = this.dataService.getQuizzById(this.route.snapshot.paramMap.get('id'));
    console.log(this.quizz);
  }

  public answerWith(index:number):void{
    let chosenAnswer = this.quizz.questions[this.step].possibleAnswers[index];
    this.dataService.sendAnswer(this.quizz, chosenAnswer);

    if(this.step >= this.quizz.questions.length - 1){
      console.log("Quizz ended!");
      this.router.navigateByUrl('result/'+this.quizz.id);
    }
    else{
      this.step++;
    }
  }

}
