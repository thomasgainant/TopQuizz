import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Answer } from 'src/data/answer';
import { Quizz } from 'src/data/quizz';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    
  }

  public getQuizzes():Observable<Quizz[]>{
    return this.http.get(environment.apiUrl+'/quizzes/', { params: new HttpParams(), headers: this.headers }) as Observable<Quizz[]>;
  }

  public getQuizzById(id:string):Observable<Quizz>{
    return this.http.get(environment.apiUrl+'/quizz/'+id, { params: new HttpParams(), headers: this.headers }) as Observable<Quizz>;
  }

  public sendAnswer(quizz:Quizz, answer:Answer):Observable<Quizz>{
    return this.http.post(environment.apiUrl+'/quizz/'+quizz.id, answer, { params: new HttpParams(), headers: this.headers }) as Observable<Quizz>;
  }

  public getQuizzResult(id:string):Observable<Quizz>{
    return this.getQuizzById(id);
  }
}
