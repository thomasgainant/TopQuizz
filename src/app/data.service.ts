import { Injectable } from '@angular/core';
import { Answer } from 'src/data/answer';
import { Quizz } from 'src/data/quizz';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  quizzes:Quizz[] = [
    {
      id: "89cbf98c-8b5c-4091-a5dd-4212618af5b3",
      title: "Animals",
      questions: [
        {
          content: "How long does the gestation period of an elephant last?",
          correctAnswer: {
            content: "22 months"
          },
          possibleAnswers: [
            {
              content: "22 months"
            },
            {
              content: "32 months"
            }
          ]
        }
      ]
    },
    {
      id: "2013db16-7adf-4424-9969-66f1777b010a",
      title: "Geography",
      questions: [
        
      ]
    },
    {
      id: "f18739df-793b-48fd-97f1-9c06304562d3",
      title: "History",
      questions: [
        
      ]
    },
    {
      id: "4be8bff8-87fa-4b82-8a97-b2c348d99ed6",
      title: "Gastronomy",
      questions: [
        
      ]
    }
  ];

  public quizzesAnswers:{} = {};

  constructor() { }

  public getQuizzById(id:string):Quizz{
    for(let quizz of this.quizzes){
      if(quizz.id === id){
        return quizz;
      }
    }
    return null;
  }

  public sendAnswer(quizz:Quizz, answer:Answer){
    if(this.quizzesAnswers[quizz.id] == null){
      this.quizzesAnswers[quizz.id] = [];
    }
    this.quizzesAnswers[quizz.id].push(answer);
  }

  public getQuizzResult(id:string){
    let quizzDisplayed:Quizz = null;
    for(let quizz of this.quizzes){
      if(quizz.id === id){
        quizzDisplayed = quizz;
      }
    }

    for(let index in quizzDisplayed.questions){
      let question = quizzDisplayed.questions[index];
      question.chosenAnswer = this.quizzesAnswers[quizzDisplayed.id][index];      
    }
    
    return quizzDisplayed;
  }
}
