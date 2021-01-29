import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { QuizzesListComponent } from './quizzes-list/quizzes-list.component';
import { QuizzComponent } from './quizz/quizz.component';
import { QuizzesResultsListComponent } from './quizzes-results-list/quizzes-results-list.component';
import { QuizzResultComponent } from './quizz-result/quizz-result.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: QuizzesListComponent },
  { path: 'quizz/:id', component: QuizzComponent },
  { path: 'results', component: QuizzesResultsListComponent },
  { path: 'result/:id', component: QuizzResultComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
