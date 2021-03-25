import {Injectable, Injector} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpErrorResponse, HttpEvent, HttpInterceptor} from "@angular/common/http";
import {catchError, finalize, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,
              private router: Router,
              private authServise: AuthService,
              private notification: NzNotificationService) {
  }

  intercept(req, next): Observable<HttpEvent<any>> {
    if (req.url === 'http://localhost:8000/api/login' || req.url === 'http://localhost:8000/api/user' || req.url === 'http://localhost:8000/api/role'){
      return next.handle(req);
    }
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();
    const tokenizedReq = req.clone(
      {
        headers: req.headers.append('Authorization', 'Bearer ' + token)
      }
    );


    return next.handle(tokenizedReq).pipe(catchError((error: HttpErrorResponse) => {
        console.log('eeerrrrrrrrr', error);
      if (error instanceof HttpErrorResponse) {
        if (error.status == 401 || error.status == 403) {
          this.notification.create('error', 'Please Login !', 'You are Unauthorized');
          this.authServise.logout();
          this.router.navigate(['/login']);
          return throwError(error);
        } else {
          return throwError(error);
        }
      }
    }
    ));
  }
}
