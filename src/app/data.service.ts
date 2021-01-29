import { Injectable } from '@angular/core';
import { Answer } from 'src/data/answer';
import { Quizz } from 'src/data/quizz';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /* Mocked backend as a service */
  quizzes:Quizz[] = [];

  constructor() {
    if(localStorage.getItem('quizzes') != null && localStorage.getItem('quizzes') != ''){
      this.quizzes = JSON.parse(localStorage.getItem('quizzes'));
    }
    else{
      this.initQuizzes();
    }
  }

  public initQuizzes():void{
    this.quizzes =
    [
      {
        id: "89cbf98c-8b5c-4091-a5dd-4212618af5b3",
        title: "Zoology",
        questions: [
          {
            content: "How long does the gestation period of an african elephant last?",
            image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/African_elephant_warning_raised_trunk.jpg',
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
          },
          {
            content: "Are cats carnivore or omnivore in nature?",
            image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Domestic_Cat_Demonstrating_Dilated_Slit_Pupils.jpg',
            correctAnswer: {
              content: "Carnivore"
            },
            possibleAnswers: [
              {
                content: "Carnivore"
              },
              {
                content: "Omnivore"
              }
            ]
          },
          {
            content: "How many animal species have been listed on planet Earth?",
            correctAnswer: {
              content: "1 250 000"
            },
            possibleAnswers: [
              {
                content: "1 250 000"
              },
              {
                content: "3 200 000"
              }
            ]
          },
          {
            content: "What is the class of the common squid?",
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Sepioteuthis_sepioidea_%28Caribbean_Reef_Squid%29.jpg',
            correctAnswer: {
              content: "Cephalopoda"
            },
            possibleAnswers: [
              {
                content: "Cephalopoda"
              },
              {
                content: "Arthropoda"
              }
            ]
          },
          {
            content: "Can a five ounce african swallow carry a one pound coconut?",
            correctAnswer: {
              content: "Yes"
            },
            possibleAnswers: [
              {
                content: "Yes"
              },
              {
                content: "No"
              }
            ]
          }
        ]
      },
      {
        id: "2013db16-7adf-4424-9969-66f1777b010a",
        title: "Geography",
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
          },
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
          },
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
          },
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
          },
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
        id: "f18739df-793b-48fd-97f1-9c06304562d3",
        title: "History",
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
          },
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
          },
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
          },
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
          },
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
        id: "4be8bff8-87fa-4b82-8a97-b2c348d99ed6",
        title: "Gastronomy",
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
          },
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
          },
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
          },
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
      }
    ];

    localStorage.setItem('quizzes', JSON.stringify(this.quizzes));
  }

  public getQuizzById(id:string):Quizz{
    for(let quizz of this.quizzes){
      if(quizz.id === id){
        return quizz;
      }
    }
    return null;
  }

  public sendAnswer(quizz:Quizz, answer:Answer){
    for(let quizzInMemory of this.quizzes){
      if(quizz.id === quizzInMemory.id){
        if(!Array.isArray(quizzInMemory.answers)){
          quizzInMemory.answers = [];
        }
        quizzInMemory.answers.push(answer);
        break;
      }
    }

    localStorage.setItem('quizzes', JSON.stringify(this.quizzes));
  }

  public getQuizzResult(id:string){
    let finishedQuizz:Quizz = null;
    for(let quizz of this.quizzes){
      if(quizz.id === id){
        finishedQuizz = quizz;
        break;
      }
    }

    let everyAnswerCorrect:boolean = true;

    for(let index in finishedQuizz.questions){
      let question = finishedQuizz.questions[index];
      question.chosenAnswer = finishedQuizz.answers[index];

      if(DataService.checkAnswer(question.chosenAnswer, question.correctAnswer)){
        question.chosenAnswer.validity = Answer.Validity.Correct;
      }
      else{
        question.chosenAnswer.validity = Answer.Validity.Incorrect;
        everyAnswerCorrect = false;
      }
    }

    if(everyAnswerCorrect){
      finishedQuizz.completion = Quizz.Completion.Correct;
    }
    else{
      finishedQuizz.completion = Quizz.Completion.Incorrect;
    }

    localStorage.setItem('quizzes', JSON.stringify(this.quizzes));

    return finishedQuizz;
  }

  public static checkAnswer(chosenAnswer:Answer, correctAnswer:Answer):boolean{
    if(chosenAnswer.content === correctAnswer.content){
      return true;
    }
    return false;
  }
}
