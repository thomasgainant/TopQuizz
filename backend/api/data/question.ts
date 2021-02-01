import { Answer } from "./answer";

export interface Question{
    content:string;
    image?:string;
    correctAnswer?:Answer;
    chosenAnswer?:Answer;
    possibleAnswers:Answer[];
}