import {Injectable, Injector} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpInterceptor} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {

  constructor(private injector: Injector) {
  }

  intercept(req, next) {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();
    const tokenizedReq = req.clone(
      {
        headers: req.headers.append('Authorization', 'Bearer ' + token)
      }
    );
    console.log("rrrrrrrrrrrrrrrr", tokenizedReq);
    return next.handle(tokenizedReq);
  }
}
