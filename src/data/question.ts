import { Answer } from "./answer";

export interface Question{
    content:string;
    correctAnswer?:Answer;
    chosenAnswer?:Answer;
    possibleAnswers:Answer[];
}