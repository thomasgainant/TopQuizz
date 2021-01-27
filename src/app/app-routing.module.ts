import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { QuizzesListComponent } from './quizzes-list/quizzes-list.component';
import { QuizzComponent } from './quizz/quizz.component';

const routes: Routes = [
  { path: '', component: QuizzesListComponent },
  { path: 'quizz/:id', component: QuizzComponent }
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
