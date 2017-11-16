import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { TokenService } from './../token.service';

@Injectable()
export class UserService extends BaseService {

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) {
    super();
    console.log('User Service is connected...');
    }
    private tokenStorageKey = 'token';
    private refreshTokenKey = 'refresh_token';
    private _apiUrl = 'http://localhost:19586/api/';


    public register(user: UserRegistration) {
      const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      };

      return this.http.post(this._apiUrl + 'account/register', user);
    }

    public login(user: UserCredentials) {
      console.log('logging in...');
      return this.tokenService.login(user).do(token => {
        localStorage.setItem(this.tokenStorageKey, token.access_token);
        localStorage.setItem(this.refreshTokenKey, token.refresh_token);
                this.router.navigate(['welcome']);
      }); // TODO error handling
    }

    public logout() {
      localStorage.removeItem(this.tokenStorageKey);
      localStorage.removeItem(this.refreshTokenKey);
      console.log('logging out...');
      this.router.navigate(['login']);
    }


  public getToken() {
    return localStorage.getItem(this.tokenStorageKey);
  }

  public refreshToken() {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    return this.tokenService.refreshToken(refreshToken).do(token => {
      localStorage.setItem(this.tokenStorageKey, token.access_token);
      localStorage.setItem(this.refreshTokenKey, token.refresh_token);
    });
  }
}

export class UserCredentials {
  email: string;
  password: string;
}

export class UserRegistration {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  password: string;
  confirmPassword: string;
}

