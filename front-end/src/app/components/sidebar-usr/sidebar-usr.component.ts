import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-sidebar-usr',
  templateUrl: './sidebar-usr.component.html',
  styleUrls: ['./sidebar-usr.component.css']
})
export class SidebarUsrComponent {

  vacio: Login[]=[];
  constructor(private authService: AuthService){}

  logOut(){
    this.authService.setLogIn(false)
    this.authService.setRol(this.vacio);
  }
}
