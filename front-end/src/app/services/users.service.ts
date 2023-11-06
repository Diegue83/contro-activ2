import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private URL_API='http://localhost:3000/usuarios';
  public user:User=
  {idUsr:0,usr:'',rol:''}
  users:User[]=[]

  constructor(private http: HttpClient) {}

  getUsr(){
    return this.http.get<User[]>(this.URL_API);
  }
}
