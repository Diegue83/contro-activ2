import { Component } from '@angular/core';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
