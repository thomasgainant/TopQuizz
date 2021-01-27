import { Injectable } from '@angular/core';
import { Quizz } from 'src/data/quizz';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  quizzes:Quizz[] = [
    {
      id: "89cbf98c-8b5c-4091-a5dd-4212618af5b3",
      title: "Animals"
    },
    {
      id: "2013db16-7adf-4424-9969-66f1777b010a",
      title: "Geography"
    },
    {
      id: "f18739df-793b-48fd-97f1-9c06304562d3",
      title: "History"
    },
    {
      id: "4be8bff8-87fa-4b82-8a97-b2c348d99ed6",
      title: "Gastronomy"
    }
  ];

  constructor() { }
}
