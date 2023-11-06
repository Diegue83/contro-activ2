import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(public loginService:LoginService, private router: Router, private authService: AuthService){
    console.log(this.authService.getLogIn())
  }
  
  ngOnInit(): void{
    console.log(this.authService.getLogIn());
  }

  valLog(form:NgForm){
    console.log('Validando...')

    this.loginService.valLog(form.value).subscribe(
      res => {
        if(res.length == 0){
          console.log('Usuario o contraseña incorrecto');
          form.reset();
        }
        else{
          this.authService.setLogIn(true);
          this.authService.setRol(res);
          console.log(this.authService.getLogIn())
          console.log('Sesion iniciada')
          if(res[0].rol == 'adm'){
            console.log('admin'); 
            this.router.navigate(['home-adm']);
          }else{
            console.log('usr');
            this.router.navigate(['home-usr']);
          }
        }
      },
      err => {
        console.log('Error al iniciar' + err)
      }
    )
    console.log('Me voy pa aca y no valido')
  }
  
  formReset(form:NgForm){
    this.loginService.login = form.value;
    form.reset();
  }
}
