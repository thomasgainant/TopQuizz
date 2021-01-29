import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/internal/operators';
import * as moment from 'moment';

import { User } from 'src/data/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {

  }

  login(email:string, password:string ) {
      return this.http.post<User>('/api/login', {email, password})
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay()
      );
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

  getExpiration() {
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
