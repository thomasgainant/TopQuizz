import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/data/user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userSaved = JSON.parse(localStorage.getItem("user")) as User;

    if (userSaved && userSaved.token) {
      const cloned = req.clone({
          headers: req.headers.set("Authorization",
              "Bearer " + userSaved.token)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
