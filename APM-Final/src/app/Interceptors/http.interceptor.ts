import { UserService } from './../user/user.service';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/finally';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private userService: UserService;

  constructor(private inj: Injector) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // https://github.com/angular/angular/issues/18224
this.userService = this.inj.get(UserService);

    const token = this.userService.getToken(); // TODO error handling
    const bearerToken = 'bearer ' + token;

    const authReq = req.clone({
      headers: req.headers.set('Authorization', bearerToken)
    });

   // this.showLoader();
    return next
      .handle(authReq)
      .do(null, (err: HttpErrorResponse) => {
        if (err.status === 401) {
          // Try refresh
          this.userService.refreshToken().subscribe(
            () => {
              const freshToken = this.userService.getToken();
              const freshBearerToken = 'bearer ' + freshToken;

              const newAuthReq = req.clone({
                headers: req.headers.set('Authorization', freshBearerToken)
              });
              return next.handle(newAuthReq);
            },
            error => {
              this.userService.logout();
            }
          );
        }
      });
   // .finally(() => this.hideLoader());
  }

  // private showLoader() {
  //   this.loadingService.show();
  // }

  // private hideLoader() {
  //   this.loadingService.hide();
  // }
}
