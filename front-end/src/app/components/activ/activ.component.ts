import { Actividad } from 'src/app/models/actividades';
import { ActividadesService } from 'src/app/services/actividades.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { LugaresService } from 'src/app/services/lugares.service';
import { AuthService } from 'src/app/auth.service';
import { Login } from 'src/app/models/login';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-activ',
  templateUrl: './activ.component.html',
  styleUrls: ['./activ.component.css'],
})
export class ActivComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRoles: User[] = [];

  constructor(
    public actividadService: ActividadesService,
    public userService: UsersService,
    public lugaresService: LugaresService,
    public authService: AuthService
  ) {
    this.isLoggedIn = this.authService.getLogIn();
  }

  ngOnInit(): void {
    this.getUsr();
    this.getLugar();
    this.authService.getRol().subscribe((rol) => {
      this.userRoles = rol;
    });
    console.log(this.userRoles[0].idUsr);
    this.getByUsrAct(this.userRoles[0].idUsr);
  }

  getLugar() {
    this.lugaresService.getLug().subscribe(
      (res) => {
        this.lugaresService.lugares = res;
        console.log(res);
      },
      (error) => console.error()
    );
  }

  getUsr() {
    this.userService.getUsr().subscribe(
      (res) => {
        this.userService.users = res;
        console.log(res);
      },
      (error) => console.log(error)
    );
  }

  getByUsrAct(idUsr:any) {
    this.actividadService.getByUsrAct(this.userRoles[0].idUsr).subscribe(
      (res) => {
        this.actividadService.actividades = res;
        console.log(res);
      },
      (error) => console.log(error)
    );
  }

  formReset(form: NgForm) {
    this.actividadService.actividad = form.value;
    form.reset();
  }

  visible: boolean = false;
  oculto: boolean = true;
  alerta: boolean = true;

  mostrar() {
    if (this.visible) {
      this.visible = false;
      this.alerta = false;
    } else {
      this.visible = true;
    }
  }
  Ocultar() {
    if (this.oculto) {
      this.oculto = false;
    } else {
      this.oculto = true;
    }
  }

  Alerta() {
    if (this.alerta) {
      this.alerta = false;
    } else {
      this.alerta = true;
    }
  }
}
function idUsr(value: Login, index: number, array: Login[]): value is Login {
  throw new Error('Function not implemented.');
}

