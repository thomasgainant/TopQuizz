import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuizzesListComponent } from './quizzes-list/quizzes-list.component';
import { QuizzComponent } from './quizz/quizz.component';
import { QuizzResultComponent } from './quizz-result/quizz-result.component';
import { QuizzesResultsListComponent } from './quizzes-results-list/quizzes-results-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizzOverviewComponent } from './quizzes-list/quizz-overview/quizz-overview.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    QuizzesListComponent,
    QuizzComponent,
    QuizzResultComponent,
    QuizzesResultsListComponent,
    QuizzOverviewComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
