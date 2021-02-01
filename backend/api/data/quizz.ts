import { Answer } from "./answer";
import { Question } from "./question";

export interface Quizz{
    id:string;
    title:string;
    questions:Question[];
    answers?:Answer[];
    completion?:Quizz.Completion;
}

export namespace Quizz{
    export enum Completion{
        Correct,
        Incorrect
    }
}