import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';

@Injectable()
export class UserService extends BaseService {

  constructor(public http: HttpClient) {
    super();
    console.log('User Service is connected...');
    }

    private _apiUrl = 'http://localhost:19586/api/';

    login(user: UserRegistration) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this._apiUrl + 'account', user);
    }

}

export class UserRegistration {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  password: string;
  confirmPassword: string;
}

export interface Credentials {
email: string;
password: string;
}
