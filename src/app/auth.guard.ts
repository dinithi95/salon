import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild,
  Router, RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const roles = next.data["roles"] as Array<string>;
      if (roles) {
        const match = this.authService.checkAllowedRoles(roles);
        if (match) {
          return true;
        }
      }
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
    // this.router.navigate(['/login']);
    // return false;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data["roles"] as Array<string>;
    const isAuthorized = this.authService.checkAllowedRoles(allowedRoles);

    if (!isAuthorized) {
      this.router.navigate(['']);
    }

    return isAuthorized;
  }
}
