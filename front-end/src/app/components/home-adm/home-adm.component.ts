import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Login } from 'src/app/models/login';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-home-adm',
  templateUrl: './home-adm.component.html',
  styleUrls: ['./home-adm.component.css']
})
export class HomeAdmComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRoles: User[] = [];

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.getLogIn();
  }
  
  ngOnInit() {
    this.authService.getRol().subscribe((rol) => {
      this.userRoles = rol;
    });
    console.log(this.userRoles)
  }

}
