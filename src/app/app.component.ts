import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public authService:AuthService;

  constructor(private authServiceInj:AuthService, private dataService:DataService){
    this.authService = authServiceInj;
  }

  public reset():void{
    this.dataService.initQuizzes();
    window.location.reload();
  }
}
