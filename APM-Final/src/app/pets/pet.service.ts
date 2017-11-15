import { UserService } from './../user/user.service';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class PetService {

  constructor(public http: HttpClient, private userService: UserService) {
console.log('Pet Service is connected...');
   }
private _apiUrl = 'http://localhost:19586/api/';
private _body: string;

addPet(pet: Pet, fileToUpload: any) {
  const payload = new FormData();
  payload.append('name', pet.name.toString());
  payload.append('town', pet.town.toString());
  payload.append('age', pet.age.toString());
  payload.append('image', fileToUpload);

  return this.http.post<Pet>(this._apiUrl + 'pets', payload);
  }

deletePet(id: number) {
return this.http.delete(this._apiUrl + 'pets/' + id);
}

getPet(id: number): Observable<Pet> {
  return this.http.get<Pet>(this._apiUrl + 'pets/' + id);
}

getAllPets(): Observable<Pet[]> {
  const token = this.userService.getToken();
   // TODO error handling
  const header = new HttpHeaders().set('Authorization', 'Bearer' + token);

  const options = {
    headers: header,
  };

  return this.http.get<Pet[]>(this._apiUrl + 'pets', options);
}
}

export class Pet {
  id: number;
  name: string;
  age: number;
  town: string;
  image: string;
}
