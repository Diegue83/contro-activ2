import { Injectable } from '@angular/core';
import { User } from './models/users';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    const storedRoles = localStorage.getItem('userRoles');
    if (storedRoles) {
      this.rol = JSON.parse(storedRoles);
      this.rolesSubject.next(this.rol);
      
    }
    if(this.rol.length!=0){
      this.setLogIn(true);
    }
    
  }

  public logIn: boolean=false;
  private rol: User[]=[];
  private rolesSubject = new BehaviorSubject<User[]>([]);

  setLogIn(login: boolean){
    this.logIn=login
  }

  setRol( rol: User[]){
    this.rolesSubject.next(rol);
    localStorage.setItem('userRoles', JSON.stringify(rol));
  }

  getLogIn(){
    return this.logIn
  }

  getRol(): Observable<User[]> {
    return this.rolesSubject.asObservable();
  }
}
