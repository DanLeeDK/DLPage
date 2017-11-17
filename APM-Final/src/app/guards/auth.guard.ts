import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {

constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const refreshToken = localStorage.getItem('refresh_token');

          if (tokenNotExpired('token')) {
            return true;
          } else {
            if (!refreshToken) {
              this.router.navigate(['/login'], {
                queryParams: { returnUrl: state.url }
              });
              return false;
            }
            this.userService.refreshToken();
                return false;
          }
  }
}
