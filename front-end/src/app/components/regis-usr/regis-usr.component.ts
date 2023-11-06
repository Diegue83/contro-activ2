import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regis-usr',
  templateUrl: './regis-usr.component.html',
  styleUrls: ['./regis-usr.component.css']
})
export class RegisUsrComponent {
  constructor(public loginService: LoginService, private router: Router, public userService: UsersService) {}

  ngOnInit(): void {
    this.getUsr();
  }

  getUsr() {
    this.userService.getUsr().subscribe(
      res => {
        this.userService.users = res;
      },
      error => console.log(error)
    )
  }

  insUsr(form: NgForm) {
    this.loginService.insUsr(form.value).subscribe(
      res => {
        form.reset();
        console.log('Insertado pas')

        this.router.navigate(['login']);
      },
      err => console.log(err)
    )
  }


  formReset(form: NgForm) {
    this.loginService.login = form.value;
    form.reset();
  }
}
