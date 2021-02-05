import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizzesListComponent } from './quizzes-list/quizzes-list.component';
import { QuizzComponent } from './quizz/quizz.component';
import { QuizzResultComponent } from './quizz-result/quizz-result.component';
import { QuizzesResultsListComponent } from './quizzes-results-list/quizzes-results-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizzOverviewComponent } from './quizzes-list/quizz-overview/quizz-overview.component';
import { AppRoutingModule } from './app-routing.module';
import { QuizzAnswerResultComponent } from './quizz-result/quizz-answer-result/quizz-answer-result.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './login/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    QuizzesListComponent,
    QuizzComponent,
    QuizzResultComponent,
    QuizzesResultsListComponent,
    QuizzOverviewComponent,
    QuizzAnswerResultComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
