import { Question } from "./question";

export interface Quizz{
    id:string;
    title:string;
    questions:Question[];
}