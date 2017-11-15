import { UserCredentials } from './user/user.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class TokenService {
  private url = 'http://localhost:19586/api/auth/';

  constructor(private http: HttpClient) {}

  public login(user: UserCredentials): Observable<IOidcResponse> {
    const options = {
      headers: new HttpHeaders().set(
        'Content-Type', 'application/x-www-form-urlencoded'
      )
    };

    const data = `grant_type=password&username=${user.email}&password=${user.password}&scope=openid%20offline_access`;
    console.log('setting token...');
    return this.http
      .post<IOidcResponse>(`${this.url}login`, data, options)
      .catch((errorResponse: HttpErrorResponse) => {
        return Observable.throw(errorResponse);
      });
  }

  public refreshToken(refreshToken: string) {
    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    };

    const data = `grant_type=refresh_token&refresh_token=${refreshToken}&scope=openid%20offline_access`;

    return this.http
      .post<IOidcResponse>(`${this.url}login`, data, options)
      .catch((errorResponse: HttpErrorResponse) => {
        return Observable.throw(errorResponse);
      });
  }
}
export interface IOidcResponse {
  access_token: string;
  refresh_token: string;
}

export interface IOidcErrorResponse {
  error: string;
  error_description: string;
}
