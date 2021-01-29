export interface Answer{
    content:string;
    validity?:Answer.Validity;
}

export namespace Answer{
    export enum Validity{
        Correct,
        Incorrect
    }
}