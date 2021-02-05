import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/internal/operators';
import * as moment from 'moment';

import { User } from 'src/data/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {

  }

  login(email:string, password:string ) {
    console.log(`Login to API with: ${email}, ${password}`);
    let userToLogIn:User = {
      email: email,
      password: password
    };
    (this.http.post(environment.apiUrl+'/login/', userToLogIn, { params: new HttpParams(), headers: this.headers }) as Observable<User>).subscribe((loggedInUser:User) =>{
      this.setSession(loggedInUser);
      console.log("Redirecting to home page");
      this.router.navigateByUrl('/');
    });
  }
        
  private setSession(authResult) {
      const expiresAt = moment().add(authResult.tokenExpiration, 'second');

      let user:User = {
        token: authResult.token,
        tokenExpiration: expiresAt.valueOf()
      };

      localStorage.setItem('user', JSON.stringify(user));
  }          

  logout() {
    localStorage.removeItem("user");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration(){
    let savedUser:User = JSON.parse(localStorage.getItem('user')) as User;
    if(savedUser != null){
      return moment(savedUser.tokenExpiration);
    }
    return null;
  }

  getUser():User{
    if(this.isLoggedIn()){
      return JSON.parse(localStorage.getItem('user'));
    }
    else{
      return null;
    }
  }
}
