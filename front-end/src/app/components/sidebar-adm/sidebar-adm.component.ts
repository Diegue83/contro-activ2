import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-sidebar-adm',
  templateUrl: './sidebar-adm.component.html',
  styleUrls: ['./sidebar-adm.component.css']
})
export class SidebarAdmComponent implements OnInit {

  userInfo:User={usr:'',rol:''}
  isLogged: boolean=false;

  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.getRol().subscribe((rol) => {
      this.userInfo = {
        idUsr:rol[0].idUsr,
        usr:rol[0].usr,
        rol:rol[0].rol
      }
    });
    this.isLogged=false
    this.logged();
    
  }

  logOut(){
    this.userInfo={idUsr:0,usr:'',rol:''}
    const users:User[]=[this.userInfo]
    this.authService.setRol(users)
  }

  logged(){
    console.log(this.userInfo.idUsr)
    if (this.userInfo.idUsr!=0){
      this.isLogged=true;
    }
  }
}
